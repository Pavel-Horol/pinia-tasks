<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import { useTaskStore } from "./stores/TasksStore";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from "pinia";
import TabAbout from "./components/TabAbout.vue";
import TabHome from "./components/TabHome.vue";
import ChildComp from "./components/ChildComp.vue";

const tasksStore = useTaskStore();
const filter = ref("all");
const { tasks, isLoading, favs, totalCount, favsCount } =
  storeToRefs(tasksStore);
tasksStore.getTasks();

const sortedTasks = computed(() => {
    return [...tasks.value].sort((a, b) => a.title.localeCompare(b.title));
});

const currentTasksType = computed(() => {
  if (filter.value === 'favs') return favs;
  if (filter.value === 'sort') return sortedTasks;
  return tasks;
})

const amountTasks = computed(() => {
  return filter.value === "favs" ? favsCount : totalCount;
});
const amountTaskMessage = computed(() => {
  return (filter.value === "favs" ? favsCount.value : totalCount.value) === 1
    ? "task"
    : "tasks";
});
onMounted(() => console.log("Component mounted"));
onUpdated(() => console.log("Component updated"));

const currentTab = ref(TabHome);
</script>

<template>
  <main>
    <!-- header -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia tasks store</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
        All tasks
      </button>
      <button :class="{ active: filter === 'favs' }" @click="filter = 'favs'">
        Fav tasks
      </button>
      <button :class="{ active: filter === 'sort' }" @click="filter = 'sort'">
        Sort task
      </button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="isLoading">Loading tasks...</div>

    <!-- task list -->
    <div v-else class="task-list">
      <p>
        Your have {{ amountTasks }} {{ amountTaskMessage}}
      </p>
      <transition-group tag="div" name="task">
        <div v-for="task in currentTasksType.value" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </transition-group>
    </div>


    <!-- <div>
      <ChildComp class="red"/>
    </div> -->

  </main>
</template>

<style>
.red {
  color: red;
}
.filter button.active {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: 1px solid #0056b3;
}
.task-enter-active,
.task-leave-active {
  transition: all 0.3s ease;
}
.task-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.task-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.task-move {
  transition: transform 0.3s ease;
}
</style>

    <!-- testing features -->
    <!-- <div style="margin: 60px auto; width: 60%;">
      <hr />
      <button @click="tasksStore.$reset">reset state</button>
      <nav>
        <button @click="currentTab = TabHome">Home</button>
        <button @click="currentTab = TabAbout">About</button>
      </nav>
      <component :is="currentTab"></component>
      <button @click="obj.pet.id++">pet id: {{ obj.pet.id }}</button>
    </div> -->