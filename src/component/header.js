import React , { useState }from 'react';
function Header({title}){
  return(
    <div style={{display:'block',width:'50%',height:100,backgroundColor:'#1565c0',margin:'auto'}}>
        <h1 style={{}}>{title}</h1>
    </div>
  );
}
export default React.memo(Header);