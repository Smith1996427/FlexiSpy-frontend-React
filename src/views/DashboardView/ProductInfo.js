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
import {
  ShoppingCart as ShoppingCartIcon
} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight : "320px"
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
    marginTop : "15%"
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
          Product Info
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
            Product  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  FlexiSPY iP [ Software Available]
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
          >
            License Key  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  51648181052
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
          >
            Expiration Date  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  Sep 17, 2023 4 : 59 : 59 PM
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
          >
            Version  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  9.2.1
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
          >
            Activations  &nbsp;&nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp;  5
          </Typography>
        </Box>
        
      </Box>
      <Avatar className={classes.avatar}>
        <ShoppingCartIcon />
      </Avatar>
    </Card>
  );
}

TodaysMoney.propTypes = {
  className: PropTypes.string
};

export default TodaysMoney;
