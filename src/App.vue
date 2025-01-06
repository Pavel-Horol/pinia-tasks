<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import { useTaskStore } from "./stores/TasksStore";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from "pinia";
import TabAbout from "./components/TabAbout.vue";
import TabHome from "./components/TabHome.vue";
const tasksStore = useTaskStore();
const { tasks, isLoading, favs, totalCount, favsCount } =
  storeToRefs(tasksStore);
tasksStore.getTasks();

onMounted(() => console.log("Component mounted"));
onUpdated(() => console.log("Component updated"));

const currentTab = ref(TabHome);

const filter = ref("all");
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
    </nav>

    <!-- loading -->
    <div class="loading" v-if="isLoading">Loading tasks...</div>

    <!-- task list -->
    <div v-else class="task-list">
      <p>
        Your have {{ filter === "favs" ? favsCount : totalCount }}
        {{
          (filter === "favs" ? favsCount : totalCount) === 1 ? "task" : "tasks"
        }}
      </p>
      <transition-group tag="div" name="task">
        <div v-for="task in filter === 'favs' ? favs : tasks" :key="task.id">
            <TaskDetails :task="task" />
        </div>
      </transition-group>
    </div>
    

    <!-- testing features -->
    <!-- <div style="margin: 60px auto; width: 60%;">
      <hr />
      <button @click="tasksStore.$reset">reset state</button>
      <nav>
        <button @click="currentTab = TabHome">Home</button>
        <button @click="currentTab = TabAbout">About</button>
      </nav>
      <component :is="currentTab"></component>
    </div> -->
  </main>
</template>

<style scoped>
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
