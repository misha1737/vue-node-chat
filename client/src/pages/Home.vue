<template>
  <div class="ChatPage">
    <h1>Home</h1>
    

    <div class="changeImg" v-if="logoUrl" @click="OpenFileSelect()">
       <img :src='logoUrl' >
       <p>click to change photo</p>
    </div>

    <div  v-else class="selectImg" @click="OpenFileSelect()">
      <img src="../assets/user.svg" >
      <p>click to upload photo</p>
    </div>
    {{errorMsg}}
    <form method="post" enctype="multipart/form-data" id="form-logo-upload">
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
  name: "HomePage",
  data() {
    return {
     errorMsg:''
    };
  },
  props: {
    msg: String,
    logoUrl: String
  },
  methods: {
    OpenFileSelect() {
      let el = document.getElementById("logo-upload");
      if (el) el.click();
    },
    UploadLogo() {
      let el = document.getElementById("form-logo-upload");
      var formData = new FormData(el);

      //  Axios.post("http://localhost:5000/uploadImg", formData
      // ).then(res => {
      //   console.log(res);
      // });

      Axios({
        method: "post",
        url: "http://localhost:5000/uploadImg",
        crossDomain: true,
        withCredentials: true,
        data: formData
      })
        .then(response => {
          console.log(response.data.logoUrl);
          this.$emit('login', {loginName:response.data.login, logo:response.data.logoUrl} )
          this.errorMsg='';
          console.log("file downloaded");
        })
        .catch(error => {
          console.log(error);
          switch (error.response.data) {
            case "file too big":
              this.errorMsg = "file too big";
              break;
            case "wrong format":
              this.errorMsg = "wrong format";
              break;
            default:
              this.errorMsg = "unknown error";
              break;
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./../scss/_variables.scss";
@import "./../scss/_userpage.scss";

</style>
