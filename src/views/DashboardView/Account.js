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
  User as UserIcon,
  Headphones as HeadphonesIcon
} from 'react-feather';

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
    width: 48,
    alignItems: 'center',
    justifyContent : "center",
    textAlign : "center"
  },

  infoContent:{
    margin : "25px",
    marginBottom : "0px",
    justifyContent : "center"
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
          Account
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          style={{justifyContent : "center"}}
          flexWrap="wrap"
        >
        <Box
          alignItems="center"
          flexWrap="wrap"
          className = {classes.infoContent}
        >
        <Avatar className={classes.avatar}>
          <UserIcon />
        </Avatar>
          <Typography
            variant="h5"
            color="textSecondary"
            style={{textAline : "center"}}
          >
            Manage <br />
            Account
          </Typography>
        </Box>
        <Box
          alignItems="center"
          flexWrap="wrap"
          className = {classes.infoContent}
        >
        <Avatar className={classes.avatar}>
          <HeadphonesIcon />
        </Avatar>
          <Typography
            variant="h5"
            color="textSecondary"
            style={{textAline : "center"}}
          >
            Contact <br />
            Support
          </Typography>
        </Box>
        </Box>
      </Box>
    </Card>
  );
}

TodaysMoney.propTypes = {
  className: PropTypes.string
};

export default TodaysMoney;
