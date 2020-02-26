<template>
  <div class="toDo">
    <h1>ToDo List</h1>
    

    <div class="list">
        <button class="addTask" @click="create">+</button>

        <!-- <div class="checked" >
              <input type="checkBox" name="state" class="check" @click="checked = !checked" />
              <label for="state"></label>
              <span @click="checked = !checked">Больше не запрашивать</span>
        </div> -->

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
      dragging: null,
      checked: false
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

.check {
  display:inline-block; 
  position: static;
  width:20px;
  height:20px;
  z-index: 2;
  opacity: 0.3;
  margin: 0px ;
}
.check + label {
  position: relative;
  // padding: 0 0 0 60px;
  cursor: pointer;
}
.check + label:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  border-radius: 5px;
  border: 1px solid red;
  transition: 0.2s;
}
.check:checked + label:before {
  background: #fff;
}
.check:checked + label:after {
  content: '';
  //background-image: url("./../assets/icons/done.svg");
  background-color: red;
  color: red;
  position: absolute;
  top: 5px;
  right: 5px;
  height:7px;
  width:9px;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
