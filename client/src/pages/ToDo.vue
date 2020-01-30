<template>
  <div >
    <h1>ToDo List</h1>
        <button @click="click">click</button>   
  </div>
</template>

<script>
import Axios from "axios";


export default {
  name: "HomePage",
  data() {
    return {
        click(){
            
        }
    };
  },
  props: {

  },
  components:{
  },
  methods: {





  },
  create(){
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.buttom{
    background:white;
}
</style>
