export function createStore(rootReducer,initialState){
  let state = rootReducer(initialState,{type:'__INIT__'})
  const subcsribes = []

  return{
    dispatch(action){  
      state = rootReducer(state,action)
      subcsribes.forEach(sub => sub())
    },
    subcsribe(callback){
      subcsribes.push(callback)

    },
    getState(){
      return state 
    }

  }
}