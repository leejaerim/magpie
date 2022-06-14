import React , { useEffect, useState }from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Alert from '@mui/material/Alert';
import Menu from './Menu.js';
import './table.css';
import {useDispatch, useSelector} from 'react-redux'

const SET_MENU = 'userReducer/SET_MENU';
const EDIT_MENU = 'userReducer/EDIT_USER';
const setMenu = arg => ({
    type: SET_MENU,
    data: arg,
});
const editMenu = (key, Cnt) => ({    
    type: EDIT_MENU,    
    data: {key, Cnt},
});
function Table(props){
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
        dispatch(editMenu(key, val));
    }
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(      
            setMenu([        
                {          
                    mName: "김치찌개",         
                    Cnt: 0,          
                    Cost: 8000,        
                },        
                {                  
                    mName: "계란말이",         
                    Cnt: 0,          
                    Cost: 5000,        
                },     
                {                   
                    mName: "추가",         
                    Cnt: 0,          
                    Cost: 1000,        
                },    
                {                  
                    mName: "음료수",         
                    Cnt: 0,          
                    Cost: 2000,        
                },    
                {                  
                    mName: "소주/맥주",         
                    Cnt: 0,          
                    Cost: 4000,        
                },     
            ])    
        );
    },[])
    
    const {keys , objs} = useSelector((state)=>state);
    const userData = keys.map((key) => objs[key]);
    let Sum = 0
    for(const i in userData){ Sum = Sum + userData[i].Cnt*userData[i].Cost}
    return(
        <span>
            <div  className={props.index === props.num ? 'active' : 'none'}>
                <ul></ul>
            <List style={{width : '80%'}}>
                {userData.map((item) => (          
                    <React.Fragment key={item.key}>            
                        <Menu mName={item.mName} index={item.key} cnt={item.Cnt} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt} cost={item.Cost}/>
                    </React.Fragment>        
                ))}
            </List>
                <Alert severity="info" style={{width : '80%'}}>
                    총액 : {Sum}
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