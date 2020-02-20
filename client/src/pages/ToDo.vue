<template>
  <div class="toDo">
    {{list}}
    <h1>ToDo List</h1>
        <button class="addTask" @click="create">+</button>   
          <div class="list">
            <div v-for="(task,id) in list" :key="id">
               <task :task="task" @delTask="delTask"></task>
            </div>
          </div>  

  </div>
</template>

<script>
import Axios from "axios";
import task from "./../components/Task.vue";

export default {
  name: "HomePage",
  data() {
    return {
        list:[{
            name: 'task1',
            description: 'some description',
            id:1,
            done:false,
            open:true
            },
            {
            name: 'task2',
            description: 'some description2',
            id:2,
            done:true,
            open:false
           },
            {
            name: 'task3',
            description: 'some description3',
            id:3,
            done:false,
            open:false
            },
        ]


    };
  },
  props: {

  },
  components:{
    task
  },
  methods: {
        create(){
          console.log("++")
          this.list.push({
            name: 'new task',
            description: 'some description',
            id:this.list.length+1,
            done:false,
            open:false
          })
        },
        delTask(id){
          console.log("del task "+id)
          let index=this.list.findIndex(element => element.id==id);
          this.list.splice(index,1)
        }
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./../scss/_variables.scss";
@import "./../scss/_base.scss";
@import "./../scss/_ToDoList.scss";
</style>
