/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlignJustify,
  ArrowDownLeft as ArrowDownLeftIcon,
  ArrowUpRight as ArrowUpRightIcon,
  XCircle as XCircleIcon
} from 'react-feather';
import Label from 'src/components/Label';
import AudioPlayer from 'material-ui-audio-player';


const useStyles = makeStyles((theme) => ({
  root: {}
}));

function Results({ className, recorded, Back, ...rest }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');


  // const handlePageChange = (event, newPage) => {
  //   setPage(newPage);
  // };



  return (
    <>
      <Grid container style={{minHeight:"450px", justifyContent : "center"}}>
        <Grid style = {{marginTop : "15%"}} item xs={12} md={6}>
        <AudioPlayer
            elevation={1}
            width="100%"
            variation="default"
            spacing={3}
            download={true}
            autoplay={true}
            order="standart"
            preload="auto"
            src={recorded}
          />
        </Grid>
        </Grid>
        <Box style={{textAlign : "right"}}>
            <Button
              color="secondary"
              variant="contained"
              onClick={Back}
              style={{margin : "30px"}}
            >
              Back
            </Button>
      </Box>
      </>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  recorded: PropTypes.string
};

export default Results;
