import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [] as { id: number; title: string; isFav: boolean }[],
    isLoading: false,
  }),
  getters: {
    favs(state) {
      return state.tasks.filter((task) => task.isFav);
    },
    favsCount(state) {
      return state.tasks.filter((task) => task.isFav).length;
    },
    totalCount(state) {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      this.isLoading = true;

      setTimeout(async () => {
        const res = await fetch("http://localhost:3000/tasks");
        const data = await res.json();

        this.tasks = data;
        this.isLoading = false;
      }, 1000);
    },
    async addTask(task: string) {
      const maxId =
        this.tasks.length > 0
          ? Math.max(...this.tasks.map((task) => task.id))
          : 0;
      const id = maxId + 1;
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          title: task,
          isFav: false,
        }),
      });
      this.tasks.push({ id, title: task, isFav: false });
    },
    async favTask(taskId: number) {
      let updatedTask;
      this.tasks.forEach((task) => {
        if (task.id === taskId) {
          task.isFav = !task.isFav;
          updatedTask = task;
        }
      });
      if (updatedTask) {
        const res = await fetch("http://localhost:3000/tasks/" + taskId, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          //@ts-ignore
          body: JSON.stringify({ isFav: updatedTask.isFav! }),
        });
      }
    },
    async deleteTask(taskId: number) {
      const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      console.log(res)
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
  },
});
