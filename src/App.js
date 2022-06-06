import logo from './logo.svg';
import './App.css';
import React , { useState, useCallback,useEffect, useRef }from 'react';
import { Route ,BrowserRouter} from 'react-router-dom';
import Home from './Home.js';
import {createStore} from 'redux';
import {Provider,useSelector,useDispatch} from 'react-redux'
function reducer(currentState,action){
  if (currentState === undefined){
    return {};
  }
  const newState = {...currentState}
  console.log(action);
  if(action.type === 'PLUS'){
    console.log('PLUS was clicked');
    newState.number++;
  }
  return newState
}
const store = createStore(reducer)

const App = ()=> {
  return (
    <div>
      <Provider store={store}> 
        <BrowserRouter>
          <Route path="/Home" component={Home}></Route>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
