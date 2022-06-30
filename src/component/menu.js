import React , { useState }from 'react';
import { Alert ,Button} from '@mui/material';
function Menu({mname, cost}){
  debugger;
  return(
    <div style={{display:'inline-block'}}>
        <Alert severity="info" style={{width:400}}>
          {mname} : {cost}
        </Alert>
        {/* <Button variant="contained" style={{display:'inline'}}>
            {props.mName}
        </Button> */}
        <ul></ul>
    </div>
  );
}
export default React.memo(Menu);