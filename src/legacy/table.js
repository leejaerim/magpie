import React , { useEffect, useState }from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Alert from '@mui/material/Alert';
import Menu from './Menu.js';
import './table.css';
import {useDispatch, useSelector} from 'react-redux'

function Table(props){
    const [menu, setMenu] = useState([])
    const [cost, setCost] = useState(0);
    const [cnt,setCnt] = useState(props.cnt);
    const onCount = () => {
      setCost(0);
      setCnt([0,0,0,0,0]);
      props.onUpdateSum(cost);
    }
    const onUpdateCost = (val) => {
        setCost(cost+val);
    };
    const onUpdateCnt= (key,val) =>{
        
    }
    let userData = []; 
    function func_(e){
        setMenu(e)
    }
    const getMenuList =_=>{
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };   
        // make API call with parameters and use promises to get response
        fetch('https://uudbdfxsa2.execute-api.ap-northeast-2.amazonaws.com/dev', requestOptions)
        .then(response => response.text())
        .then(result => func_(JSON.parse(result).body.Items))
        .catch(error =>  alert('error', error));
    }
    useEffect(()=>{
        getMenuList();
    },[])
    
    return(
        <span>
            <div  className={props.index === props.num ? 'active' : 'none'}>
                <ul></ul>
                <List style={{width : '80%'}}>
                    {menu.map((item) => (          
                        <React.Fragment key={item.menuid}>            
                            <Menu mName={item.NAME} index={item.menuid} cnt={item.CNT} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt} cost={item.COST}/>
                        </React.Fragment>        
                    ))}
                </List> 
                <Alert severity="info" style={{width : '80%'}}>
                    총액 : {0}
                </Alert>
                <Button variant="contained" onClick={() => onCount()}>
                            계산
                </Button>
                <Button style={{marginLeft:'20%'}} variant="contained" onClick={()=> props.onUpdateIndex(0)} >
                            테이블
                </Button>
            </div>
        </span>
    );
}
export default React.memo(Table);