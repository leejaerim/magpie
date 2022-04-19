import logo from './logo.svg';
import './App.css';
import React , { useState }from 'react';
import { Route ,BrowserRouter} from 'react-router-dom';
import Home from './Home.js';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/Home" component={Home}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
