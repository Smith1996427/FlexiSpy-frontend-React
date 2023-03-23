import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  ArrowRight as ArrowRightIcon,
  MapPin as MapPinIcon
} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    alignItems: 'center'
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
  },
  map : {
      position: 'relative',
      minHeight: 350,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      '&:before': {
        position: 'absolute',
        content: '" "',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
      },
      background : `url("/static/third_party/image/dashboard_location.png")`
  }
}));

function TodaysMoney({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box display="flex"  style={{backgroundColor : "rgb(46 78 75)"}}>
        <Box display="flex">
          <Avatar className={classes.avatar}>
            <MapPinIcon />
          </Avatar>
          <Typography style={{marginTop : "15px"}}>
            Latest Location
          </Typography>
        </Box>
        <Box flexGrow={1}/>
        <Box>
          <IconButton>
          <SvgIcon fontSize="small">
            <ArrowRightIcon />
          </SvgIcon>
        </IconButton>
       </Box>
      </Box>
      <Divider />
          <Grid
            className={classes.map}
          >
          </Grid>
    </Card>
  );
}

TodaysMoney.propTypes = {
  className: PropTypes.string
};

export default TodaysMoney;
