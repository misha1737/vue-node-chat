import io from "socket.io-client";
let _timedecode = time => {
  time = +time;
  var date = new Date(time);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

let _getUsersLogo =()=>{
  
}

let socket = io("http://localhost:5000");
export default {
  state: {
    history: {
      message: [],
      page:0
    },
    userOnline:[]
  },
  mutations: {
    updateHisstory(state, payload) {
      if (payload) {
        state.history.message.push({
          time: payload.time,
          user: payload.user,
          msg: payload.msg,
          logoUrl: payload.logoUrl
        });
        
        // this.getUsersLogo(message.user,'someurl'); //собрать масив с логинами истории чата

        //     getUsersLogo(name,url){
        //       if(this.usersLogo.find(el => el.name === name)){
        //         return
        //       }else{
        //         this.usersLogo.push({name:name});
        //       }
        //   },
      } else {
        state.history.message = [];
        state.history.page=0;
      }
    },
    updateHisstoryPage(state, payload) {
      state.history.page++;
    }
    
  },
  actions: {
    asyncListen(context, payload) {
      context.commit("updateHisstory");
      socket.emit("getLoginUrl", this.usersLogo);
      socket.emit("user", payload.login);
      socket.emit("user", payload.login);
      socket.on("loadHistory", data => {
        if (data.login == payload.login) {
          if (data.history.length > 0) {
            for (var i = 0; i < data.history.length; i++) {
              var message = {};
              message.time = _timedecode(data.history[i].time);
              message.user = data.history[i].login;
              message.msg = data.history[i].message;
              let foundLogo=data.userslogo.find(element => element.name == data.history[i].login);
              message.logoUrl = foundLogo.logoUrl;
              context.commit("updateHisstory", message); 
            }
            context.commit("updateHisstoryPage"); 
            //socket.emit("getLoginUrl", this.usersLogo);
            //      this.$nextTick(() => {
            //        if(this.$refs.chat){
            //              if(this.chatHeight==0){
            //               this.chatHeight=this.$refs.chat.scrollHeight;
            //               this.$refs.chat.scrollTop= 50000;
            //              }else{
            //              this.$refs.chat.scrollTop= 600;
            //              }
            //        }
            //            })
          }

        }
      });
     // socket.on('loadLogoUrl', data=>{
          //console.log(data)
         // this.usersLogo=[];
         // for(let i=0;i<data.length;i++){
         //  this.usersLogo.push({
         //    name: data[i].name,
         //    logoUrl:data[i].logoUrl,
         //    })
         //   //добавления в сообщения логотипов
          
         // }
         // //console.log("+");
         //   for(let i in this.usersLogo){
             
         //       for(let j in this.chatHistory){
         //           if (this.chatHistory[j].user==this.usersLogo[i].name){
         //               this.chatHistory[j].logoUrl=this.usersLogo[i].logoUrl;
         //           }

         //       }

         //   }
         // this.Tend=Date.now();
         // console.log('loadHistory='+(this.Tend-this.Tstart)+'ms')

     // })
     
         socket.on('loadUsers', data=>{
             context.state.userOnline = data.filter(function(item, pos) {
             return data.indexOf(item) == pos;
             }) 
         });
    },
    asyncSignOut(context) {
      socket.disconnect()
    },
    asyncLoadHistory(context) {
      socket.emit("getHistory", context.state.history.page);
    }
  },
  getters: {
    getSoket(state) {
      return socket;
    },
    getHistory(state) {
      return state.history.message;
    },
    getUsersOnline(state) {
      return state.userOnline;
    }
  }
};
