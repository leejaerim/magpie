import React , { useState }from 'react';
import { Alert ,Button} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
//import { Link } from "react-router-dom";
function Menu(props){
  const number = useSelector((state)=>state.number)
  const menu = useSelector((state)=>state.menu)
  const dispatch = useDispatch();
  //var [cnt, setCnt] = useState(props.cnt);
  const onIncrease = () => {
      //setCnt(cnt+1);
      props.onUpdateCost(props.cost);
      props.onUpdateCnt(props.index , +1)
    }
  
  const onDecrease = () => {
      if(props.cnt >0){
          //setCnt(cnt -1);
          props.onUpdateCost(-props.cost);
          props.onUpdateCnt(props.index , -1)
      }
  }
  console.log(menu)
  return(
    <div>
        <Alert severity="info" onClick={()=>onDecrease()}>
          {props.mName} : {props.cnt}
        </Alert>
        <Button variant="contained" onClick={()=>onIncrease()} style={{display:'inline'}}>
            {props.mName}
        </Button>
        <Button variant="contained" onClick={()=>{dispatch({type:'PLUS'})}} style={{display:'inline'}}>
          {number}
        </Button>
        <ul></ul>
    </div>
  );
}
export default Menu