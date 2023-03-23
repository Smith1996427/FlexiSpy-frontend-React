/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  CardHeader,
  CardContent,
  Card,
  Divider,
  makeStyles
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';


const useStyles = makeStyles((theme) => ({
  root: {},
  content : {
    padding : "25px"
  },
  card : {
    marginRight : "25px"
  },
  mapStyles:{
    width : "100%",
    // minHeight  : "250px",
    // backgroundImage : `url('/static/third_party/image/LocationMap.png')`,
    // backgroundRepeat : "none",
    // backgroundSize : "cover"
  }
}));



function Results({ className, customers, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    > 
    <CardHeader title="Locations"/>
      <Divider />
      <CardContent>
      <PerfectScrollbar>
        <img  className={classes.mapStyles} alt = "main_map" src='/static/third_party/image/LocationMap.png'/>
      </PerfectScrollbar>
      </CardContent>
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array
};
export default Results;
