import React , { useState }from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Alert from '@mui/material/Alert';
import Menu from './Menu.js';
import './table.css';
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
    const onUpdateCnt= (index,val) =>{
        cnt[index] = cnt[index]+val;
        props.onSendMessage(props.num,cnt)
    }
    return(
        <span>
            <div  className={props.index === props.num ? 'active' : 'none'}>
                <ul></ul>
            <List style={{width : '80%'}}>
                <Menu mName={'김치찌개'} index={0} cnt={props.cnt[0]} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt}cost={8000}/>
                <Menu mName={'계란말이'} index={1} cnt={props.cnt[1]} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt} cost={5000}/>
                <Menu mName={'추가'} index={2} cnt={props.cnt[2]} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt} cost={1000}/>
                <Menu mName={'음료수'} index={3} cnt={props.cnt[3]} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt} cost={2000}/>
                <Menu mName={'소주/맥주'} index={4} cnt={props.cnt[4]} onUpdateCost={onUpdateCost} onUpdateCnt={onUpdateCnt} cost={4000}/>
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
            </div>
        </span>

    );
}
export default React.memo(Table);