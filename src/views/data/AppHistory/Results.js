/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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
  makeStyles,
  CardContent,
  CardHeader
} from '@material-ui/core';
import {Delete as DeleteIcon} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  contend : {
    padding : "20px"
  }
}));

function Results({ className, customers, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    > 
      <CardHeader title="Applications Used"  />
      <Divider />
      <CardContent className={classes.content}>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  App Name
                </TableCell>
                <TableCell>
                   State
                </TableCell>
                <TableCell>
                   Date and Time
                </TableCell>
                <TableCell align='right'>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => {

                return (
                  <TableRow
                    key={customer.id}
                  >
                    <TableCell>
                      {customer.name}
                    </TableCell>
                    <TableCell>
                      {customer.state}
                    </TableCell>
                    <TableCell>
                      {customer.updatedAt}
                    </TableCell>
                    <TableCell align='right'>
                    <IconButton>
                        <SvgIcon fontSize="small">
                          <DeleteIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
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
