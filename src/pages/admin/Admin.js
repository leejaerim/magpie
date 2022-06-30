import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {AddMenuAdministrator as AddMenu} from './AddMenuAdministrator.js';
import ButtonAppBar from '../../component/ButtonAppBar.js';
import BasicTabs from '../../component/BasicTabs.js';
function Admin() {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <div>
                    <ButtonAppBar logout={signOut}></ButtonAppBar>
                    <AddMenu></AddMenu>
                </div>
            )}
        </Authenticator>
    );
}

export default Admin;