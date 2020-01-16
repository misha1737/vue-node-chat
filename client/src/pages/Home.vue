
<template>
  <div class="ChatPage">
    <h1>Home</h1>
    <div class="selectImg" @click="OpenFileSelect()">
      selectImg
    </div>
<form  method="post" enctype="multipart/form-data" id="form-logo-upload">
      <input
      class="inputFile"
      type="file"
      name="filedata"
      id="logo-upload"
      @change="UploadLogo()"
      accept="image/*"
    />
    </form>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  methods:{
    OpenFileSelect(){
      let el = document.getElementById("logo-upload");
      if (el) el.click();
    },
    UploadLogo(){
      let el = document.getElementById("form-logo-upload");
      var formData= new FormData(el);
         Axios.post("http://kmuauto.ru:5000/uploadImg", formData
        ).then(res => {
          console.log(res);  
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.selectImg{
  background-color: yellow;
  width:200px;
  height:200px;
  text-align: center;
  margin:auto;
}
.inputFile{
  opacity:0.5;
}
</style>
