export default{
    state:{
        list: [{
            name: 'task1',
            description: 'some description',
            id:1,
            done:false,
            open:true
            },
            {
            name: 'task2',
            description: 'some description2',
            id:2,
            done:true,
            open:false
            },
            {
            name: 'task3',
            description: 'some description3',
            id:3,
            done:false,
            open:false
            },
        ],
     },
     mutations:{
        addTask(state){
                    state.list.push({
                    name: 'new task',
                    description: 'some description',
                    id:state.list.length+1,
                    done:false,
                    open:false
                  })
              },
        deleteTask(state, payload){
            let index=state.list.findIndex(element => element.id==payload);
            state.list.splice(index,1)
          },
        reorder(state, payload){
            let item = state.list.splice(payload.element,1);
            state.list.splice(payload.position,0,item[0]);
        },
        changeTaskStatus(state, payload){
            let index=state.list.findIndex(element => element.id==payload);
            state.list[index].done=!state.list[index].done;
        },
        toggleTaskMenu(state, payload){
            let index=state.list.findIndex(element => element.id==payload);
            state.list[index].open=!state.list[index].open;
        },
        setDescription(state, payload){
            let index=state.list.findIndex(element => element.id==payload.id);
            state.list[index].description=payload.description;
        },
        setName(state, payload){
            let index=state.list.findIndex(element => element.id==payload.id);
            state.list[index].name=payload.name;
        }
     },
     actions:{
         asyncChangeCounter(context, payload){
             setTimeout(()=>{
                 context.commit('changeCounter', payload)
             },1000)
         }    
     },
     getters:{
         getList(state){
             return state.list
         }
    }
}