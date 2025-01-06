<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model.lazy.trim="newTask" />
    <button type="submit">Create</button>
  </form>
</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/TasksStore';
import { onUpdated, ref } from 'vue';

const taskStore = useTaskStore()
const {addTask} = taskStore
const newTask = ref('')
const handleSubmit = () => {
    if(newTask.value.length >= 1) {
        addTask(newTask.value)
        newTask.value = '';
    }
};

onUpdated(() => console.log('Form component updated'))
</script>

