<template>
  <div class="toDo">
    <h1>ToDo List</h1>
    <button class="addTask" @click="create">+</button>
    <div class="list">
      <div v-for="(task, id) in list" :key="id">
        <drop
          class="dropZone"
          :class="{ dragging: dragging }"
          v-if="id == 0"
          @drop="handleDrop(id, ...arguments)"
        >
          <span></span>
        </drop>
        <drag
          :transfer-data="{ id }"
          @dragstart="dragging = true"
          @dragend="dragging = null"
        >
          <task :task="task" :position="id" :lastItem="id==list.length-1"></task>
        </drag>

        <drop
          v-if="id == 0"
          class="dropZone"
          :class="{ dragging: dragging }"
          @drop="handleDrop(id + 1, ...arguments)"
        >
          <span></span>
        </drop>

        <drop
          v-else
          class="dropZone"
          :class="{ dragging: dragging }"
          @drop="handleDrop(id, ...arguments)"
        >
          <span></span>
        </drop>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { Drag, Drop } from "vue-drag-drop";
import task from "./../components/Task.vue";

export default {
  name: "HomePage",
  data() {
    return {
      dragging: null
    };
  },
  props: {},
  computed: {
    list() {
      return this.$store.getters.getList;
    }
  },
  components: {
    task,
    Drag,
    Drop
  },
  methods: {
    create() {
      this.$store.commit("addTask");
    },
    handleDrop(id, data) {
      this.$store.commit("reorder", { position: id, element: data.id });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./../scss/_variables.scss";
@import "./../scss/_base.scss";
@import "./../scss/_ToDoList.scss";
</style>
