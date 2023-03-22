import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import DeviceInfo from './DeviceInfo';
import ProductInfo from './ProductInfo';
import Account from './Account';
import LastCall from './LastCall';
import LastLocation from './LatestLocation';
import LastPhoto from './LatestPhoto';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

function DashboardView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <DeviceInfo />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <ProductInfo />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <Account />
          </Grid>


          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <LastCall />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <LastLocation />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <LastPhoto />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardView;
