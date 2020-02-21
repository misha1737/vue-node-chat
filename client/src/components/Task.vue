<template>
  <div class="taskElement">
    <div class="task" :class="{ open: task.open, finish: task.done }">

      <input type="text" class="task__text" v-model="name" />
       
      <div class="infoBlock" v-if="task.open">
         
        <textarea
          ref="textarea"
          class="task__text scroll"
          type="text"
          v-model="description"
          id="description"
          aria-describedby="messageHelp"
          placeholder="Enter description"
          required
        ></textarea>
      </div>
      <div class="buttonBlock">
        <span
          class="buttonBlock__done"
          :class="{ done: task.done }"
          @click="changeTaskStatus()"
        ></span>
        <span
          class="buttonBlock__open"
          :class="{ open: task.open }"
          @click="toggleTaskMenu()"
        ></span>
        <span class="buttonBlock__delete" @click="delTask()"></span>
      </div>
    </div>
    <div class="changePositionBlock">
      <span class="up" :class="{disabled: position==0}" @click="reorder(-1)"></span>
      <span class="down" :class="{disabled: lastItem}" @click="reorder(1)"></span>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import task from "./../components/Task";

export default {
  name: "HomePage",
  data() {
    return {};
  },
  props: {
    task: Object,
    position: Number,
    lastItem: Boolean
  },
  components: {},
  computed: {
    description: {
      get() {
        return this.task.description;
      },
      set(value) {
        this.$store.commit("setDescription", {
          id: this.task.id,
          description: value
        });
      }
    },
    name: {
      get() {
        return this.task.name;
      },
      set(value) {
        this.$store.commit("setName", { id: this.task.id, name: value });
      }
    }
  },
  methods: {
    delTask() {
      this.$store.commit("deleteTask", this.task.id);
    },
    done() {
      console.log("finish");
    },
    changeTaskStatus() {
      this.$store.commit("changeTaskStatus", this.task.id);
    },
    toggleTaskMenu() {
      this.$store.commit("toggleTaskMenu", this.task.id);
    },
    reorder(val) {

        if(this.position!=0){
      this.$store.commit("reorder", {
        position: this.position + val,
        element: this.position
      });
        }

    }
  }
};
</script>
<style lang="scss"></style>
