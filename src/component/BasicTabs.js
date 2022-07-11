import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {listOrders} from '../graphql/queries.js';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from './Menu.js';
import Order from './../pages/Order.js'
import { createOrder as createOrderMutation} from '../graphql/mutations.js';
const initialFormState = { index: 0 }
function TabPanel(props) {
  const { order, children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* {
            orders.map(order => (
                <div key={order.id || order.name} style={{display:"inline-block"}}>
                <Order order={order}></Order>
                </div>
            ))
          } */}
          {
            <Order></Order>
          }
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const TabCnt = 4
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  useEffect(() => {
    fetchOrders();
  }, []);
  async function fetchOrders() {
    //orderList
    const apiData = await API.graphql({ query: listOrders });
    const listTab = []
    apiData.data.listOrders.items.map(x=>(
      listTab.push(x.index)
    ))
    for(let i=1 ;i<TabCnt+1;i++){
      if (!listTab.includes(i)){
        apiData.data.listOrders.items.push(createOrder(i));
      }
    } 
    setOrders(apiData.data.listOrders.items);
  }
  async function createOrder(num) {
    await API.graphql({ query: createOrderMutation, variables: { input: {index:num} } });
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item On1e" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One1
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Box>
  );
}