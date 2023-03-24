import React from 'react';
import {Grid, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Hero from './Hero';
import Testimonials from './Testimonials';

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: theme.palette.background.dark},
  first : {
    paddingTop : 80
  }
}));

function HomeView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Home"
    >
        <Grid
          container
          className={classes.first}
          justify = "center"
          >
           <Typography variant='h1' color='textPrimary' style={{textAlign : "center"}}>
              The World's Most Powerful Monitoring Software for Computers, Mobile Phones and Tablets
           </Typography>
           <Typography variant='h4' color='textSecondary' style={{textAlign : "center", marginTop  : "25px"}}>
             Know Everything That Happens on A Computer or Smartphone, No Matter Where You Are
           </Typography>
          </Grid>
      <Hero />
      <Testimonials />
    </Page>
  );
}

export default HomeView;
