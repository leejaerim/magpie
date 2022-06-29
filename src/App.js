import React, { useState, useEffect } from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Main from './pages/Main.js'

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Main signOut={signOut}></Main>
      )}
    </Authenticator>
  );
}

export default App;