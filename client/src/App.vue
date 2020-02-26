<template>
  <div id="app">
    <div>
      <Header :user="user" @logout="logout"></Header>
      <authorization
        class="pageContent"
        @login="Login"
        :user="user"
        v-if="!user || !user.login"
      ></authorization>
      <router-view
        class="pageContent"
        :user="user"
        @login="Login"
        v-if="user && user.login"
      ></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./components/Header.vue";
import authorization from "./components/Auth.vue";
import io from "socket.io-client";

export default {
  name: "app",
  data() {
    return {
      socket: io("http://localhost:5000")
    };
  },

  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },

  components: {
    Header,
    authorization
  },
  methods: {
    Login(user) {},
    logout() {
      this.socket.disconnect();
    }
  },
  beforeCreate() {
    this.$store.dispatch("asyncGetUser");
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
@import "scss/base.scss";
.pageContent {
  margin-top: 40px;
}
</style>
