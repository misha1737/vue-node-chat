<template>
  <div class="toDo">
    <h1>ToDo List</h1>
        <button class="addTask" @click="create">+</button>   
          <div class="list">
            <div v-for="(task, id) in list" :key="id">
               <drop class="dropZone" :class="{dragging : dragging}" v-if="id==0" @drop="handleDrop( id,...arguments)">  
                  <span></span>
                </drop>
              <drag
                :transfer-data="{ id }"
                @dragstart="dragging = true"
                @dragend="dragging = null"
              >
               <task :task="task" @delTask="delTask"></task>
               </drag>

                 <drop v-if="id==0" class="dropZone" :class="{dragging : dragging}"
                 @drop="handleDrop( id+1,...arguments)">
                  <span ></span>
                </drop>

                <drop v-else class="dropZone" :class="{dragging : dragging}"
                 @drop="handleDrop( id,...arguments)">
                  <span ></span>
                </drop>

            </div>
          </div>  
  </div>
</template>

<script>
import Axios from "axios";
import { Drag, Drop } from 'vue-drag-drop';
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
        ],
      dragging: null,

    };
  },
  props: {

  },
  components:{
    task,
    Drag,
    Drop
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
        },
        handleDrop(id, data) {
       console.log(` zone=${id} element= ${data.id} `);

          //change mas
          let index = data.id;
          let item = this.list.splice(index,1);
          this.list.splice(id,0,item[0]);
          console.log(item[0]);
        },
     
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./../scss/_variables.scss";
@import "./../scss/_base.scss";
@import "./../scss/_ToDoList.scss";
</style>
