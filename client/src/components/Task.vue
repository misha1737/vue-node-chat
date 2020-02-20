 
 <template>
    <div class="task" :class="{open: task.open, finish:task.done}">
        
         <input type="text" class="task__text" v-model="task.name">
         <div class="infoBlock" v-if="task.open">
         <textarea ref="textarea" class="task__text scroll" type="text" v-model="task.description"  id="description" aria-describedby="messageHelp" placeholder="Enter description" required></textarea>
         
         </div>
         <div class="buttonBlock"> 
             <span @click="task.done=!task.done">V</span>
             <span @click="task.open=!task.open">=</span>
             <span @click="delTask()">X</span>
         </div>
    </div>
    </template>

<script>
import Axios from "axios";
import task from "./../components/Task";

export default {
  name: "HomePage",
  data() {
      return {

      }
    
  },
  props: {
      task:Object
  },
  components:{
      
  },
  methods: {
    //   click(){
    //         console.log("++")
    //     }
    delTask(){
       this.$emit("delTask", this.task.id);   
    },
    done(){
        console.log('finish') 
    }
  },
  create(){
            document.addEventListener('click', function () {
             this.editName=false;
             console.log("456666")
            });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
