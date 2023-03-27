/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
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
  Delete as DeleteIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const tabs = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'agent',
    label: 'Agent'
  },
  {
    value: 'user',
    label: 'User'
  }
];

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)'
  }
];

function applyFilters(customers, query, filters) {
  return customers.filter((customer) => {
    let matches = true;

    if (query) {
      const properties = ['phone', 'name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (customer[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {

      const value = filters[key];

      if (value && customer.role !== key) {
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

function Results({ className, selectUsers,...rest }) {
  const classes = useStyles();

  const isMountedRef = useIsMountedRef();
  const [customers, setCustomers] = useState(null);
  


  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    agent: null,
    agnet: null,
  });


  const getCustomers = useCallback(() => {
    axios
      .get('/api/account/users/list')
      .then((response) => {
        if (isMountedRef.current) {
          setCustomers(response.data.customers);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!customers) {
    return null;
  }

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      agent: null,
      user: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(customers, query, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
          />
        ))}
      </Tabs>
      <Divider />
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Search customers"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Users
                </TableCell>
                <TableCell>
                number of phones
                </TableCell>
                <TableCell>
                  role
                </TableCell>
                <TableCell>
                  Registered Date
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => {
                return (
                  <TableRow
                    hover
                    key={customer.id}
                  >
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Avatar
                          className={classes.avatar}
                          src={customer.avatar}
                        >
                          {getInitials(customer.name)}
                        </Avatar>
                        <div>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            to="#"
                            variant="h6"
                          >
                            {customer.name}
                          </Link>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            {customer.phone}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.number}
                    </TableCell>
                    <TableCell>
                      {customer.role}
                    </TableCell>
                    <TableCell>
                      {customer.updatedAt}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to="#"
                      >
                        <SvgIcon fontSize="small">
                          <DeleteIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => selectUsers(customer.name)}
                      >
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
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
