import React from 'react';
import {
  Box,
  Container,
  // Divider,
  // Tab,
  // Tabs,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
// import Header from './Header';
import General from './General';
// import Security from './Security';
// import Order from './Order';
// import Licence from './Licence';
// import Billing from './Billing';
import PhoneManage from './PhoneManage';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width : "100%",
    margin : "0px"
  }
}));

function AccountView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth={false}>
        {/* <Header /> */}
        {/* <Box mt={3}>
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
        <Divider />*/}
        <Box mt={3}>
          <Grid container spacing={5} justify="space-between">
            <Grid item lg={5} md={5} xl={5} xs={12}>
              <General />
            </Grid>
            <Grid item lg={7} md={7} xl={7} xs={12}>
              <PhoneManage />
            </Grid>
          </Grid>
          {/* {currentTab === 'phones' && <PhoneManage />} */}
          {/* {currentTab === 'security' && <Security />} */}
          {/* {currentTab === 'order' && <Order />} */}
          {/* {currentTab === 'contact' && <Contact />} */}
          {/* {currentTab === 'licence' && <Licence />}
          {currentTab === 'billing' && <Billing />} */}
         
        </Box>
      </Container>
    </Page>
  );
}

export default AccountView;
