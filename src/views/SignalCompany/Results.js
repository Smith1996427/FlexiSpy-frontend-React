/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width : "100%",
    alignSelf : "center"
  }
}));

function Results({ className, number, ...rest }) {
  const classes = useStyles();

  const [monitor, setMonitor] = useState(number);
  
  const handleChange = (e) => {
    e.persist();
    setMonitor(e.target.value);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    > 
      <Box padding={2}>
        <Typography variant='h3'>
          Signal Company
        </Typography>
        <br />
        {/* <Typography color='textSecondary' variant='h6'>
          Specify the phone number of the device you will use for Spycall, Call Intercept, and Sim Change Notification.
        </Typography> */}
      </Box>

      <Divider />
        <Box padding={5}>
          <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                  <TextField   
                    fullWidth                
                    label="Signal Company"
                    name="company"
                    onChange={handleChange}
                    placeholder = "Company not set"
                    type="text"
                    value={monitor}
                    variant="outlined"
                  />
              </Grid>
              <Grid  item md={6} xs={12} style={{textAlign : "center", paddingTop : "20px"}}>
                <Button style={{backgroundColor : "#788369"}}>
                    Set or change mobile signal company
                </Button>
              </Grid>
          </Grid>
        </Box>
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  number: PropTypes.string
};

export default Results;
