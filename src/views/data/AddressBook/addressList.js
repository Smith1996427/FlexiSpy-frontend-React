/* eslint-disable max-len */
import React, {
  useState
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import {
  Search as SearchIcon,
  Mail as MailIcon,
  Phone as PhoneIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';


function applyFilters(customers, query) {
  return customers.filter((customer) => {
    let matches = true;

    if (query) {
      const properties = ['email', 'name', 'mobile'];
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
    return matches;
  });
}

function applyPagination(customers, page, limit) {
  return customers.slice(page * limit, page * limit + limit);
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

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(customers, query);
  const paginatedCustomers = applyPagination(filteredCustomers, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
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
          placeholder="Search contactors  (name || email || mobile Number)"
          value={query}
          variant="outlined"
        />
      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  name
                </TableCell>
                <TableCell>
                  email
                </TableCell>
                <TableCell>
                  Phone Number
                </TableCell>
                <TableCell  align="right">
                  View History
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
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.mobile}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={"/app/data/addressbook/history/call/" + customer.id}
                      >
                        <SvgIcon fontSize="small">
                          <PhoneIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to={"/app/data/addressbook/history/message/" + customer.id}
                      >
                        <SvgIcon fontSize="small">
                          <MailIcon />
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
