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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  PhoneCall as PhoneCallIcon,
  ArrowUpRight as ArrowUpRightIcon,
  ArrowRight as ArrowRightIcon
} from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
  }
}));

function TodaysMoney({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box display="flex" style={{backgroundColor : "rgb(46 78 75)"}}>
        <Box display="flex">
          <Avatar className={classes.avatar}>
            <PhoneCallIcon />
          </Avatar>
          <Typography style={{marginTop : "15px"}}>
            Latest called
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
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                    name
                  </TableCell>
                  <TableCell>
                    number
                  </TableCell>
                  <TableCell>
                    date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                    <TableRow>
                      <TableCell>
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <ArrowUpRightIcon />
                        </SvgIcon>
                      </IconButton>
                      </TableCell>
                      <TableCell>Adam</TableCell>
                      <TableCell>+1(800)6523980</TableCell>
                      <TableCell>Feb 2, 2018, 21:44</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <ArrowUpRightIcon />
                        </SvgIcon>
                      </IconButton>
                      </TableCell>
                      <TableCell>Bryan</TableCell>
                      <TableCell>+1(800)5236544</TableCell>
                      <TableCell>Jan 29, 2018, 10:49</TableCell>
                    </TableRow>
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
    </Card>
  );
}

TodaysMoney.propTypes = {
  className: PropTypes.string
};

export default TodaysMoney;
