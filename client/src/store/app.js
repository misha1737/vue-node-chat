import axios from "axios";
export default {
  state: {
    user: {
      login: null,
      logoUrl: null,
      error: null
    }
  },
  mutations: {
    setUser(state, payload) {
      if (payload) {
        state.user.login = payload.login;
        if (payload.logoUrl) {
          state.user.logoUrl = "http://localhost:5000/" + payload.logoUrl;
        }
        state.user.error = null;
      } else {
        state.user.login = null;
        state.user.logoUrl = null;
      }
    },
    setError(state, payload) {
      if (payload) {
        switch (payload) {
          
          case "access error":
            state.user.error = null;
            state.user.login = null;
            state.user.logoUrl = null;
            break;
          case "name is already taken":
            state.user.error = "Name is already taken";
            break;
          case "errorPassword":
            state.user.error =
              "Your password must be between 5 and 30 characters";
            break;
          case "error":
            state.user.error = "The login or password is incorrect";
            break;
          case "errorSymbol":
            state.user.error = "Your login must be only letters and numbers";
            break;
          case "errorLogin":
            state.user.error = "Your login must be between 5 and 30 characters";
            break;
          case "file too big":
            state.user.error  = "file too big";
            break;
          case "wrong format":
            state.user.error  = "wrong format";
            break;
          default:
            state.user.error = payload;
            break;
        }
      } else {
        state.user.error = null;
      }
    }
  },

  actions: {
    asyncGetUser(context) {
      axios({
        method: "get",
        url: "http://localhost:5000/",
        crossDomain: true,
        withCredentials: true
      }).then(response => {
        context.commit("setUser", response.data);
      }).catch(error => {
        console.log(error)
        context.commit("setError", error.response.data);
      })
    },
    asyncSignOut(context) {
      axios({
        method: "get",
        url: "http://localhost:5000/logout",
        crossDomain: true,
        withCredentials: true
      }).then(response => {
        if (response.status == 200) {
          context.commit("setUser");
        }
      });
    },
    asyncAuthorization(context, payload) {
      //
      axios.defaults.withCredentials = true;
      axios({
        method: "post",
        url: "http://localhost:5000/authorization",
        crossDomain: true,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "http:///",
          "Access-Control-Allow-Methods": "GET, POST"
        },
        data: {
          login: payload.login,
          password: payload.password
        }
      })
        .then(response => {
          context.commit("setUser", response.data);
        })
        .catch(error => {
          context.commit("setError", error.response.data);
        });
    },

    asyncRegistration(context, payload) {
      //
      axios.defaults.withCredentials = true;
      axios({
        method: "post",
        url: "http://localhost:5000/registration",
        crossDomain: true,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "http://localhost",
          "Access-Control-Allow-Methods": "GET, POST"
        },
        data: {
          login: payload.login,
          password: payload.password
        }
      })
        .then(response => {
          context.commit("setUser", response.data);
        })
        .catch(error => {
          context.commit("setError", error.response.data);
        });
      //
    },
    asyncUploadLogo(context, payload) {
      axios({
        method: "post",
        url: "http://localhost:5000/uploadImg",
        crossDomain: true,
        withCredentials: true,
        data: payload
      })
        .then(response => {
          context.commit("setUser", response.data);
          console.log("file downloaded");
        })
        .catch(error => {
          console.log(error.response.data);
          context.commit("setError", error.response.data);
        });
    }
    //
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
};
