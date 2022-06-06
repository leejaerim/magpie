import React , { useState,useCallback,useRef, useEffect} from 'react';
import { Button} from '@mui/material';
import Table from './table.js';
import Alert from '@mui/material/Alert';
const URL  = process.env.REACT_APP_URL;
function Home(){    
    const [socket,setSocket] = useState(new WebSocket(URL));
    const [isConnected, setIsConnected] = useState(false);
    const [index,setIndex] = useState(0);
    const [sumCost,setSumCost] = useState(0);
    const [cnt,setCnt]=useState([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);

    useEffect(()=>{
        if (socket.readyState == WebSocket.CONNECTING) {
            socket.addEventListener('open', onSocketOpen);
            socket.addEventListener('close', onSocketClose);
            socket.addEventListener('message', (event) => {
                onSocketMessage(event.data);
              });
        }
        return () => {
            socket.removeEventListener('open', onSocketOpen);
            socket.removeEventListener('close', onSocketClose);
            socket.removeEventListener('message', (event) => {
                onSocketMessage(event.data);
              });
          };
    },[socket])
    const onSocketOpen = useCallback(() => {
        setIsConnected(true);
        console.log("Open");
    }, [socket]);
    const onSocketClose = useCallback(() => {
        setIsConnected(false);
        console.log("Close");
    }, [socket]);
    const onSocketMessage = useCallback((dataStr) => {
        const data = JSON.parse(dataStr);
        console.log(data)
        if(data.privateMessage.action == 'setCnt'){
            setCnt(data.privateMessage.data)
        }
    }, [cnt]);
    const callAPI = (cost)=>{
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({"cost":cost});
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const _func = function(val){
            setSumCost(val);
            alert("결제 완료");
        }
        // make API call with parameters and use promises to get response
        fetch('https://yxm0puisda.execute-api.ap-northeast-2.amazonaws.com/dev/', requestOptions)
        .then(response => response.text())
        .then(result => _func(JSON.parse(result).body))
        .catch(error =>  alert('error', error));
    }
    const onUpdateIndex = (val) => {
        setIndex(val);
    };
    const onUpdateSum = (val) => {
        callAPI(val);
    };
    const onSendMessage =(table, cnt_)=>{
        cnt[table-1] = cnt_
        if (socket.readyState == WebSocket.OPEN){
            socket.send(JSON.stringify({
                action: 'setCnt',
                'data':cnt
              }));
        }
    }
    return(
        <div className="d-grid gap-2" style={{height:'100%'}}>
                <Table num={1} index={index} cnt={cnt[0]} onUpdateIndex={onUpdateIndex} onUpdateSum={onUpdateSum} onSendMessage={onSendMessage}>
                </Table>
                <Table num={2} index={index} cnt={cnt[1]} onUpdateIndex={onUpdateIndex} onUpdateSum={onUpdateSum} onSendMessage={onSendMessage}>
                </Table>
                <Table num={3} index={index} cnt={cnt[2]} onUpdateIndex={onUpdateIndex} onUpdateSum={onUpdateSum} onSendMessage={onSendMessage}>
                </Table>
                <Table num={4} index={index} cnt={cnt[3]} onUpdateIndex={onUpdateIndex} onUpdateSum={onUpdateSum} onSendMessage={onSendMessage}>
                </Table>
                <div className={index === 0 ? 'active' : 'none'}>
                    <ul>
                        <Button variant="contained" onClick={()=>{setIndex(1)}}>
                            1번 테이블
                        </Button>
                        <Button style={{marginLeft : '15%'}}  variant="contained" onClick={()=>{setIndex(2)}}>
                            2번 테이블
                        </Button>
                    </ul>
                    <ul>
                        <Button  variant="contained" onClick={()=>{setIndex(3)}}>
                            3번 테이블
                        </Button>
                        <Button style={{marginLeft : '15%'}}  variant="contained" onClick={()=>{setIndex(4)}}>
                            4번 테이블
                        </Button>
                    </ul>
                    <Alert severity="success" style={{width : '60%', marginLeft:'10%'}}>
                        총액 : {sumCost}
                    </Alert>
                </div>  
      </div>
    );
}
export default Home;