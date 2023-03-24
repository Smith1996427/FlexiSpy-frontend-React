import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Typography,
  makeStyles
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
// import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight : "250px",
    marginLeft : "10%",
    marginRight : "10%"
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  },

  infoContent:{
    marginTop : "30px"
  }
}));

function TodaysMoney({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          variant="h3"
          color="textPrimary"
          style={{textAlign : "center"}}
        >
          Device Info
        </Typography>
        <Box
          alignItems="center"
          flexWrap="wrap"
          className = {classes.infoContent}
        >
          <Typography
            variant="h5"
            color="textSecondary"
          >
            Model  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  iphone
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
          >
            OS  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  13.5
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
          >
            EMEI  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  demo
          </Typography>
          {/* <Typography
            variant="h5"
            color="textSecondary"
          >
            Network  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  -
          </Typography> */}
          <Typography
            variant="h5"
            color="textSecondary"
          >
            Battery  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  75%
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
          >
            Client status  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  Connected
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
          >
            Synced  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  3 months ago
          </Typography>
        </Box>
        
      </Box>
      <Avatar className={classes.avatar}>
        <InfoIcon />
      </Avatar>
    </Card>
  );
}

TodaysMoney.propTypes = {
  className: PropTypes.string
};

export default TodaysMoney;
