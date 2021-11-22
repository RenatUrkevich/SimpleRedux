import './styles.css'
import {  applyMiddleware, createStore,compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers/rootReducer'
import { asyncEncrement, changeTheme, decrement, increment } from './reducers/actions'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')



const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))



addBtn.addEventListener('click', () => {
 store.dispatch(increment()) 
})

subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncEncrement())
})


store.subscribe(() => {
  const state = store.getState()

  counter.textContent = state.counter
  document.body.className = state.theme.value;

  [addBtn,subBtn,themeBtn,asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled})
})

store.dispatch({type:'INIT_APPLICATION'})

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light')
  ?  'dark'
  : 'light'

  store.dispatch(changeTheme(newTheme))
  //document.body.classList.toggle('dark')
})

render()
