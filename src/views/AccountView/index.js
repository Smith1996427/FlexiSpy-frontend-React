import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import General from './General';
import Security from './Security';
// import Order from './Order';
import Contact from './Contact';
// import Licence from './Licence';
// import Billing from './Billing';
import PhoneManage from './PhoneManage';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function AccountView() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('general');
  const tabs = [
    { value: 'general', label: 'General' },
    {value : 'phones', label : "My Phones"},
    { value: 'security', label: 'Security' },
    // { value: 'order', label: 'Order Profile' },
    { value: 'contact', label: 'Contact support' }
    // { value: 'licence', label: 'By a new licence' },
    // { value: 'billing', label: 'Billing Note' }
  
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
            className={classes.tabs}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'general' && <General />}
          {currentTab === 'phones' && <PhoneManage />}
          {currentTab === 'security' && <Security />}
          {/* {currentTab === 'order' && <Order />} */}
          {currentTab === 'contact' && <Contact />}
          {/* {currentTab === 'licence' && <Licence />}
          {currentTab === 'billing' && <Billing />} */}
         
        </Box>
      </Container>
    </Page>
  );
}

export default AccountView;
