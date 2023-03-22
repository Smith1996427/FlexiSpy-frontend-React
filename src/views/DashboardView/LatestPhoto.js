import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  ArrowRight as ArrowRightIcon,
  Camera as CameraIcon
} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    alignItems: 'center',
    minHeight : "450px"
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
  img : {
   width : "40%",
   height : "40%",
   
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
            <CameraIcon />
          </Avatar>
          <Typography style={{marginTop : "15px"}}>
            Latest Photos
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
        <Box style={{textAlign : "center", paddingTop : "25px"}} >
          <Box>
            <img alt = "image1" className={classes.img}  src='/static/third_party/image/photos_1.png'></img>
            <img alt = "image2" className={classes.img}  src='/static/third_party/image/photos_2.png'></img>
          </Box>
          <Box>
          <img alt = "image3" className={classes.img}  src='/static/third_party/image/photos_3.png'></img>
          <img alt = "image4" className={classes.img}  src='/static/third_party/image/photos_4.png'></img>
          </Box>
          </Box>
    </Card>
  );
}

TodaysMoney.propTypes = {
  className: PropTypes.string
};

export default TodaysMoney;
