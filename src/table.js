import React , { useState }from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Alert from '@mui/material/Alert';
import Menu from './Menu.js';
import './table.css';
function Table(props){
    var [cost, setCost] = useState(0);
    var [cnt,setCnt] = useState([0,0,0,0,0]);
    const [sidebar, setSidebar] = useState(false);
    const onCount = () => {
      setCost(0);
      setCnt([0,0,0,0,0]);
      props.onUpdateSum(cost);
    }
    const onUpdateCost = (val) => {
        setCost(cost+val);
    };
    const onUpdateCnt= (index,val,mName) =>{
        cnt[index] = cnt[index]+val;
        setCnt(cnt)
        props.onSendMessage(props.num,{'menu':mName,'cnt':cnt[index]})
    }
    return(
        <span>
            <div  className={props.index === props.num ? 'active' : 'none'}>
                <ul></ul>
            <List style={{width : '80%'}}>
                <Menu mName={'김치찌개'} index={0} cnt={cnt[0]} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt}cost={8000}/>
                <Menu mName={'계란말이'} index={1} cnt={cnt[1]} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt} cost={5000}/>
                <Menu mName={'추가'} index={2} cnt={cnt[2]} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt} cost={1000}/>
                <Menu mName={'음료수'} index={3} cnt={cnt[3]} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt} cost={2000}/>
                <Menu mName={'소주/맥주'} index={4} cnt={cnt[4]} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt} cost={4000}/>
            </List>

                <Alert severity="info" style={{width : '80%'}}>
                    총액 : {cost}
                </Alert>
                <Button variant="contained" onClick={() => onCount()}>
                            계산
                </Button>
                <Button style={{marginLeft:'20%'}} variant="contained" onClick={()=> props.onUpdateIndex(0)} >
                            테이블
                </Button>
                <Button style={{marginLeft:'20%'}} variant="contained" onClick={()=> props.onConnect()} >
                            테스트
                </Button>
            </div>
        </span>

    );
}
export default Table;