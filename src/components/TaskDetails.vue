<template>
  <diva class="task">
        <h3>{{ task.id }}. {{ task.title }}</h3>
        <div class="icons">
            <i 
            @click="taskStore.deleteTask(task.id)" 
            class="material-icons delete">delete</i>
            <i 
            :class="{active: task.isFav}"
            @click="taskStore.favTask(task.id)" 
            class="material-icons">favorite</i>
        </div>
  </diva>
</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/TasksStore';
import { onUnmounted } from 'vue';

    defineProps(['task'])
    const taskStore = useTaskStore()
    onUnmounted(() => console.log('Task component unmounted'))
</script>

<style>
    .delete:hover {
        color: rgb(215, 92, 21);
    }
</style>