/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';
import {
  ArrowDownLeft as ArrowDownLeftIcon,
  ArrowUpRight as ArrowUpRightIcon,
  PhoneMissed as PhoneMissedIcon
} from 'react-feather';
import Label from 'src/components/Label';
import {BiDownArrow, BiUpArrow} from 'react-icons/bi'

const filterOptions = ["all", "incoming", "outcoming", 'missed'];

function applyFilters(customers, filters) {
  return customers.filter((customer) => {
    let matches = true;

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && customer.status !== key) {
        matches = false;
      }
    });

    return matches;
  });
}

function applyPagination(customers, page, limit) {
  return customers.slice(page * limit, page * limit + limit);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySort(customers, sort) {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // eslint-disable-next-line no-shadow
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));



function Results({ className, customers, ...rest }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('updatedAt|desc');
  const [filters, setFilters] = useState({
    incoming: null,
    outcoming: null,
    missed: null
  });




  const handleTabsChange = (value) => {
    const updatedFilters = {
      ...filters,
      incoming: null,
      outcoming : null,
      missed : null
    };

    if(value > 3)
    {
      setCurrentTab(0);
    }
    else{
      updatedFilters[filterOptions[value]] = true;
      setCurrentTab(value);
    }
    setFilters(updatedFilters);
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(event.target.checked
      ? customers.map((customer) => customer.id)
      : []);
  };

  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers((prevSelected) => prevSelected.filter((id) => id !== customerId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(customers, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, limit);
  const enableBulkOperations = selectedCustomers.length > 0;
  const selectedSomeCustomers = selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    > 
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllCustomers}
              indeterminate={selectedSomeCustomers}
              onChange={handleSelectAllCustomers}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        <Box minWidth={400}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllCustomers}
                    indeterminate={selectedSomeCustomers}
                    onChange={handleSelectAllCustomers}
                  />
                </TableCell>
                <TableCell onClick={() => handleTabsChange(currentTab + 1)}>
                  <Box display='flex'>
                    <Box style={{marginRight : "5px"}}>
                      Status
                    </Box>
                  {(currentTab === 0) &&
                   <Label color='success'> all </Label> 
                  }
                   {(currentTab === 2) &&
                    <Label color="error">
                      <ArrowUpRightIcon />
                    </Label>
                  }
                   {(currentTab === 1) &&
                    <Label color="success">                   
                       <ArrowDownLeftIcon />
                    </Label>
                  }
                   {(currentTab === 3) &&
                    <Label>                   
                       <PhoneMissedIcon />
                    </Label>
                  }
                  </Box>
                </TableCell>
                <TableCell>
                <Box display='flex'>
                  <Box>
                     Duration
                  </Box>
                  <Box style={{lineHeight : 0, marginLeft :"5px",fontSize :"11px"}}>
                      <BiUpArrow onClick={() => handleSortChange("duration|desc")}/><br />
                      <BiDownArrow onClick={() =>handleSortChange("duration|asc")}/>
                  </Box>
                  </Box>
                </TableCell>
                <TableCell  align="right">
                <Box display='flex' justifyContent='right'>
                  <Box>
                     Date & time
                  </Box>
                  <Box style={{lineHeight : 0, marginLeft :"5px",fontSize :"11px"}}>
                      <BiUpArrow onClick={() => handleSortChange("updatedAt|desc")}/><br />
                      <BiDownArrow onClick={() =>handleSortChange("updatedAt|asc")}/>
                  </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => {
                const isCustomerSelected = selectedCustomers.includes(customer.id);

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isCustomerSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isCustomerSelected}
                        onChange={(event) => handleSelectOneCustomer(event, customer.id)}
                        value={isCustomerSelected}
                      />
                    </TableCell>
                    <TableCell>
                      {(customer.status === "incoming") &&
                         <Label color="success">
                              <ArrowDownLeftIcon />
                        </Label>
                      }
                      {(customer.status === "outcoming") &&
                         <Label color="error">
                            <ArrowUpRightIcon />
                        </Label>
                      }
                       {(customer.status === "missed") &&
                         <Label color="primary">
                            <PhoneMissedIcon />
                        </Label>
                      }
                    </TableCell>
                    <TableCell>
                      {customer.duration}
                    </TableCell>
                    <TableCell align="right">
                      {customer.updatedAt}
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
        count={filteredCustomers.length}
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
  className: PropTypes.string,
  customers: PropTypes.array
};

Results.defaultProps = {
  customers: []
};

export default Results;
