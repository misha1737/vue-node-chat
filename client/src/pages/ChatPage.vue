
<template>
      <div class="container">
        <h1>Chat</h1>
    
        
        <div class="chat">
          <ul id="all_messages" class="chatContent scroll"  ref="chat" @scroll="onScroll">
           
            <li  :class="{ownMessage: message.user==login}" v-for="message in chatHistory" :key="message.id">
               <div class="chatMessage" >
                <p class='messageUser' >{{message.user}}</p> <span class="message">{{message.msg}} </span> <span class="messageTime"> {{message.time}}</span>
                </div>
            </li>
          </ul>
          <div id="messForm" class="messageForm" v-on:keyup.enter="clickButton()">
                  <textarea  type="text" v-model="textMessage" class="form-control scroll" id="message" aria-describedby="messageHelp" placeholder="Enter Message" resize: none required></textarea>
                <button type="button" @click="clickButton()" class="btn sendMessage">Send</button>   
          </div>
            <div class="userOnline">
              <h2>online</h2>
                  <li v-for="login in userOnline" :key="login.id">
                    {{login}}
                  </li>
           </div>  
         </div> 
            
      
      
      

    </div>
</template>


<script>
import Vue from 'vue'

import io from "socket.io-client"

export default {
  name: 'ChatPage',
  props: {
    msg: String,
    login: String,
  },
  data(){
      return{
            data: 'text data message', 
            socket: io("http://kmuauto.ru:5000"),
            textMessage: '',
            chatHistory: [],
            userData: '',
            historyPage: 0,
            pauseToLoad: false,
            chatHeight: 0,
            userOnline: []
            }
    },
    sockets: {
        connect: function () {
            console.log('socket connected');   
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    methods: {
        clickButton() {
            this.socket.emit('send mess', this.textMessage)
            this.textMessage='';
        },
          getHistory(){
            
                this.socket.emit('getHistory', this.historyPage)
         
                    this.historyPage++;
   
        },
        listen(){
          this.socket.on('add mess', data=>{            
            data.time=this.timedecode(data.time );
            this.chatHistory.push(data);
            this.$nextTick(() => {
            this.$refs.chat.scrollTop= this.$refs.chat.scrollHeight+20000;
            });
          });
          this.socket.on('loadHistory', data=>{
              if (data.login==this.login){
            if (data.history.length>0){

              for(var i=0; i<data.history.length; i++) {
                  var message={};
                  message.time= this.timedecode(data.history[i].time);
                  message.user= data.history[i].login;
                  message.msg= data.history[i].message;
                  this.chatHistory.unshift(message);
               }
                this.$nextTick(() => {
                        if(this.chatHeight==0){
                         this.chatHeight=this.$refs.chat.scrollHeight;
                         this.$refs.chat.scrollTop= 50000;
                        }else{
                        this.$refs.chat.scrollTop= 600;
                        }
                   
                      })
            }
              }
          });
           this.socket.on('loadUsers', data=>{
              

              this.userOnline = data.filter(function(item, pos) {
              return data.indexOf(item) == pos;
              })
           
           })
            this.socket.on('error', data=>{
              console.log(data)
            });
        },
        onScroll(){
          
        if(this.$refs.chat.scrollTop<50 && !this.pauseToLoad){
         this.pauseToLoad=true;
            this.getHistory();
            setTimeout( () => {
              this.pauseToLoad=false
              
              }, 10);
        }

        },
        timedecode(time){
          time= +time;
            var date = new Date( time );
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            if (minutes<10){
              minutes="0"+minutes;
            }
            if (seconds<10){
              seconds="0"+seconds;
            }
            return hours+':'+minutes+':'+seconds
        }
        
    },
    async created(){
      this.listen();    
      this.socket.emit('user', this.login);
      
      
    },
    mounted(){
      this.getHistory();
    }
   
}

</script>

<style lang="scss">
@import "./../scss/variables.scss";
@import "./../scss/base.scss";
@import "./../scss/_chat.scss";
</style>
