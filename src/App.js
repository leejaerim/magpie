import logo from './logo.svg';
import './App.css';
import React , { useState }from 'react';
function App() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  var callAPI = (firstName,lastName)=>{
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"firstName":firstName,"lastName":lastName});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://yxm0puisda.execute-api.ap-northeast-2.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
  }
  return (
    <div>
      <form>
        <label>First Name :</label>
        <input type='text' placeholder='성' onChange={(e)=>{setFName(e.target.value)}} />
        <label>Last Name :</label>
        <input type='text' placeholder='이름' onChange={(e)=>{setLName(e.target.value)}} />
        <button type="button" onClick={()=>{callAPI(fName,lName)}}>Call API</button>
      </form>
    </div>
  );
}

export default App;
