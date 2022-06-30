import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import {  BrowserRouter,  Switch,  Route,} from "react-router-dom";
import Admin from './pages/admin/Admin.js'
Amplify.configure(config);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <BrowserRouter>
   <Switch>
      <Route exact path="/"><App /></Route>
      <Route path="/admin"><Admin /></Route>
    </Switch>
  </BrowserRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
