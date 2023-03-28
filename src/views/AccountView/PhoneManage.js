/* eslint-disable max-len */
import React, {
  useState
} from 'react';
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
  TablePagination,
  TableRow,
  makeStyles,
  CardHeader
} from '@material-ui/core';
import {
  Delete as DeleteIcon
} from 'react-feather';

import { useSelector } from 'react-redux';
import Label from 'src/components/Label';


function applyPagination(customers, page, limit) {
  return customers.slice(page * limit, page * limit + limit);
}


const useStyles = makeStyles((theme) => ({
  root: {minHeight : "600px",marginTop : "-14px"}
}));

function Results({ className, ...rest }) {
  const classes = useStyles();
  
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { phoneNumbers } = useSelector((state) => state.userPhones);


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const paginatedCustomers = applyPagination(phoneNumbers, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
     <CardHeader title='My phones' />
      <Divider />

      <PerfectScrollbar>
        <Box >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Phone Number
                </TableCell>
                <TableCell>
                  Model
                </TableCell>
                <TableCell>
                  OS
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Resistered Date
                </TableCell>
                <TableCell align="right">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => {
                return (
                  <TableRow
                    hover
                    key={customer}
                  >
                   <TableCell>
                      {customer}
                    </TableCell>
                    <TableCell>
                      iphon
                    </TableCell>
                    <TableCell>
                      13.5
                    </TableCell>
                    <TableCell>
                      <Label color="success"> 75%</Label> 
                    </TableCell>
                    <TableCell>
                      2023-3-26
                    </TableCell>
                    <TableCell align="right">
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
      <TablePagination
        component="div"
        count={phoneNumbers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
