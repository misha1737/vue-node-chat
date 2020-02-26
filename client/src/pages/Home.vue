<template>
  <div >
    <h1>Home</h1>
    <div class="userPage">
      <div class="edit">
      <div class="edit-left">
    <div class="changeImg" v-if="user.logoUrl" @click="OpenFileSelect()">
       <img :src='user.logoUrl' >
       <p>click to change photo</p>
    </div>

    <div v-else class="selectImg" @click="OpenFileSelect()">
      <img src="../assets/user.svg" >
      <p>click to upload photo</p>
    </div>
    <div class='errorMsg'>
    {{errorMsg}}
    </div>
    <form method="post"  enctype="multipart/form-data" id="form-logo-upload">
      <input type="text" v-model="coordinates" class="inputFile" name="coordinates">
      <input
        ref="formLogoUpload"
        class="inputFile"
        type="file"
        name="filedata"
        id="logo-upload"
        @change="CropLogo()"
        accept="image/*"
      />
    </form>
    </div>
    <div class="edit-right">
        {{user}}
    </div>
    </div>
      <div class="modalUploadLogo" v-if="img">
       <span class="close" @click="close()"></span>
         <cropper
            classname="cropper"
            :src="img"
            :stencilProps="{
              aspectRatio: 1/1
            }"
            @change="change"
        ></cropper>
        <button class="btn-ok" @click="UploadLogo()">ок</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { Cropper } from 'vue-advanced-cropper'

export default {
  name: "HomePage",
  data() {
    return {
     errorMsg:'',
     img: '',
     coordinates: ''
    };
  },

  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },

  props: {
    msg: String,
    //user: Object
  },
  components:{
    Cropper
  },
  methods: {
    change({coordinates, canvas}) {
      this.coordinates=JSON.stringify(coordinates);
    },
    close(){
      this.img=''
    },

    OpenFileSelect() {
      let el = document.getElementById("logo-upload");
      if (el) el.click();
    },
    UploadLogo(){
        let el = document.getElementById("form-logo-upload");
        let formData = new FormData(el);
        this.$store.dispatch("asyncUploadLogo", formData);
    },

    CropLogo() {
       const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.img=reader.result;
              resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        async function Main() {
          const file = document.getElementById("logo-upload").files[0];
         toBase64(file)
        }
       Main();
    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./../scss/_variables.scss";
@import "./../scss/_userpage.scss";

</style>
