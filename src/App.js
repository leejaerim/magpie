import logo from './logo.svg';
import './App.css';
import React , { useState, useCallback,useEffect, useRef }from 'react';
import { Route ,BrowserRouter} from 'react-router-dom';
import Home from './Home.js';
import {createStore} from 'redux';
import {Provider,useSelector,useDispatch} from 'react-redux'

function reducer(currentState,action){
  if (currentState === undefined){
    return {
      keys:[],
      objs: {},
    };
  }
  //const {type,action} = action;
  //값 복사
  const newState = {...currentState}
  const { type, data} = action
  if(action.type === 'PLUS'){
    console.log('PLUS was clicked');
  }else if(type === 'userReducer/SET_MENU'){
    let i = 0;
    // 인덱스 키 만들기      
    const keys = data.map(obj => obj['key'] = i++);      
    // 키 매칭해서 객체 만들기      
    const objs = data.reduce((nextObjs, obj) => ({        
      ...nextObjs,        
      [obj['key']]: obj,      
    }), {});      
    return { ...currentState, keys, objs };
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
