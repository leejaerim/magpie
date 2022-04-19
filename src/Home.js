import React , { useState }from 'react';
import { Button} from '@mui/material';
import Table from './table.js';
import Alert from '@mui/material/Alert';
function Home(){
    const [index,setIndex] = useState(0);
    const [sumCost,setSumCost] = useState(0);

    var callAPI = (cost)=>{
        // instantiate a headers object
        var myHeaders = new Headers();
        // add content type header to object
        myHeaders.append("Content-Type", "application/json");
        // using built in JSON utility package turn object to string and store in a variable
        var raw = JSON.stringify({"cost":cost});
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

    const onUpdateIndex = (val) => {
        setIndex(val);
    };
    const onUpdateSum = (val) => {
        callAPI(val);
        setSumCost(sumCost+val);
    };
      
    return(
        <div className="d-grid gap-2" style={{height:'100%'}}>
                <Table num={1} index={index} onUpdateIndex={onUpdateIndex} onUpdateSum={onUpdateSum}>
                </Table>
                <Table num={2} index={index} onUpdateIndex={onUpdateIndex} onUpdateSum={onUpdateSum}>
                </Table>
                <Table num={3} index={index} onUpdateIndex={onUpdateIndex} onUpdateSum={onUpdateSum}>
                </Table>
                <Table num={4} index={index} onUpdateIndex={onUpdateIndex} onUpdateSum={onUpdateSum}>
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
                    <Alert severity="success" style={{width : '20%', marginLeft:'2%'}}>
                        총액 : {sumCost}
                    </Alert>
                </div>  
      </div>
    );
}
export default Home;