
<template>
      <div class="container">
        <h1>Chat</h1>
        <p style="display:none">
        {{usersLogo}}
        </p>
        {{chatHistory[0]}}
        <div class="chat">
          <ul id="all_messages" class="chatContent scroll"  ref="chat" @scroll="onScroll">
            <li :class="{ownMessage: message.user==user.login}" v-for="message in chatHistory" :key="message.id">
                <div class="loginImgBlock">
                <div class="loginImg" v-if="!message.logoUrl"><img  src="../assets/user.svg" alt=""></div>
                <div class="userImg" v-else-if="message.user==user.login"><img  :src="user.logoUrl" alt=""></div>
                <div class="userImg" v-else><img  :src="'http://localhost:5000/'+message.logoUrl" alt=""></div>
                </div>
               <div class="chatMessage" >
                <p class='messageUser' >{{message.user}}</p> <pre class="message">{{message.msg}}</pre> <span class="messageTime"> {{message.time}}</span>
                </div>
            </li>
            
          </ul>
          <div class="chatStatus"><div v-if='chatStatus.length>0'><span  v-for="user in chatStatus" :key="user.id">{{user}} </span> <span>writes a message...</span></div></div>
          <div id="messForm" class="messageForm" @keydown="clickButton" @keyup="shiftOff">
                  <textarea  ref="textarea" type="text" v-model="textMessage" class="form-control scroll" id="message" aria-describedby="messageHelp" placeholder="Enter Message" resize: none required></textarea>
                <button type="button" @click="sendMessage()" class="btn sendMessage">Send</button>   
          </div>
          <button @click="getHistory()">loadHistory</button>
            <div class="userOnline">
              <h2>users online</h2>
                  <li v-for="login in usersOnline" :key="login.id">
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
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    socket() {
      return this.$store.getters.getSocket;
    },
    chatHistory(){
      return this.$store.getters.getHistory;
    },
    usersOnline(){
      return this.$store.getters.getUsersOnline;
    }
  
  
  },

  data(){
      return{
            textMessage: '',
            userData: '',
            pauseToLoad: false,
            chatHeight: 0,
            //userOnline: [],
            usersLogo: [],
            Tstart:0,
            Tend:0,
            keyShift:false,
            chatStatus: []
            }
    },
    
    methods: {

      // connect(){
      //   if(!this.socket){
      //     console.log('false soket')
      //   }else{
      //       console.log('true soket')
      //   }
      //     this.socket.connect('111');
      //     console.log(this.socket)
      // },
      sendMessage(){
            if(this.textMessage.length>1){
            this.socket.emit('send mess', {text: this.textMessage, login: this.user.login});
            this.textMessage='';
            }
        },
        shiftOff(event){
          if(event.key=='Shift'){
             this.keyShift=false;
          } 
        },
        clickButton(event) {
          if(this.$refs.textarea.value.charCodeAt(0)==10){
            this.$refs.textarea.value=null;
          }
            this.textMessage.slice(0, -1);
            //добавить функцию печатает сообщения
              this.socket.emit('writeMessage', this.user);

          if(event.key=='Shift'){
             this.keyShift=true;
          }
          if(event.key=='Enter' && !this.keyShift){
            if(this.textMessage.length>1){
              console.log(this.textMessage.charCodeAt(0));
            this.socket.emit('send mess', {text: this.textMessage, login: this.user.login});
            this.textMessage='';
            }else{
              
              this.textMessage='';
              this.$refs.textarea.value=null;
            }
          }
        },
          getHistory(){
            this.$store.dispatch("asyncLoadHistory");
           // this.Tstart=Date.now();
              //  this.socket.emit('getHistory', this.historyPage)
           //   this.historyPage++;
            //this.$store.getters.getHistory;

        },
        // getUsersLogo(name,url){
        //     if(this.usersLogo.find(el => el.name === name)){
        //       return
        //     }else{
        //       this.usersLogo.push({name:name});
        //     }
        // },
        listen(){
           console.log('test1:')
           this.$store.dispatch("asyncListen", this.user);
           this.$store.dispatch("asyncLoadHistory");
          // //console.log(this.socket);
          // this.socket.on('add mess', data=>{   
          //   console.log('test:')         
          //   data.time=this.timedecode(data.time );
          //   //data.logoUrl=data.logoUrl;
          //   this.chatHistory.push(data);
          //   this.$nextTick(() => {
          //   this.$refs.chat.scrollTop= this.$refs.chat.scrollHeight+20000;
          //   });
          // });



    
                
          //       this.$nextTick(() => {
          //         if(this.$refs.chat){
          //               if(this.chatHeight==0){
          //                this.chatHeight=this.$refs.chat.scrollHeight;
          //                this.$refs.chat.scrollTop= 50000;
          //               }else{
          //               this.$refs.chat.scrollTop= 600;
          //               }
          //         }
          //             })


          //   }
          //      }
          //  });
         

          
          //  this.socket.on('writingUser', data=>{
          //     //пишет
          //     console.log(data);
          //     let find=false;
          //     for(let i in this.chatStatus){
          //       if (this.chatStatus[i]==data){
          //         find=true;
          //       }
          //     }
          //     if(!find){
          //     this.chatStatus.push(data);
   
          //      setTimeout(() =>this.chatStatus.shift(), 2000);
          //     }
          //  })
         
          //   this.socket.on('error', data=>{
          //     console.log(data)
          //   });
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
  
        
    },
    async created(){
      this.listen();    
      //this.getHistory();
    },
    mounted(){
      
    }
   
}

</script>

<style lang="scss">
@import "./../scss/variables.scss";
@import "./../scss/base.scss";
@import "./../scss/_chat.scss";
</style>
