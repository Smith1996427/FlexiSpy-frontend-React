/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Backdrop,
  Card,
  CardContent,
  Checkbox,
  Divider,
  Fade,
  Modal,
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
  ArrowDownLeft as ArrowDownLeftIcon,
  ArrowUpRight as ArrowUpRightIcon
} from 'react-feather';
import Label from 'src/components/Label';

const tabs = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'received',
    label: 'received'
  },
  {
    value: 'sent',
    label: 'sent'
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
  },
  modal:{
    position: 'absolute',
    maxWidth: 1200,
    top : 50,
    width : "50%",
    padding: theme.spacing(2, 4, 3),
    
  },
  paper:{
    display: 'flex',
    justifyContent: 'center',
    overflow: "scroll"
  },
}));

function Results({ className, customers, ...rest }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(customers[0]);
  const [filters, setFilters] = useState({
    received: null,
    sent: null
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      received: null,
      sent: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setSelectedCustomers([]);
    setCurrentTab(value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
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


  
  const openModal = (messageContent) => {
    setMessage(messageContent);
    setOpen(true);
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
    > <Box display="flex" padding={2}>
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
      <Divider />
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
        <Box minWidth={700}>
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
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Mail
                </TableCell>
                <TableCell>
                  Content
                </TableCell>
                <TableCell  align="right">
                  Date
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
                    onClick = {() => openModal(customer)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isCustomerSelected}
                        onChange={(event) => handleSelectOneCustomer(event, customer.id)}
                        value={isCustomerSelected}
                      />
                    </TableCell>
                    <TableCell>
                      {(customer.status === "received") &&
                         <Label color="success">
                              <ArrowDownLeftIcon />
                        </Label>
                      }
                      {(customer.status === "sent") &&
                         <Label color="error">
                            <ArrowUpRightIcon />
                        </Label>
                      }
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                      >
                        {customer.fromName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        {customer.subject}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {customer.description}
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
      
      <Modal open={open}  className={classes.paper}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        ><Fade in={open}>
              <Card className={classes.modal}>
              <CardContent>  

                <Typography color='textPrimary' variant="h5">
                  From : {message.fromName}
                </Typography>
                <Typography color='textPrimary' variant="h5">
                  Email : {message.fromEmail}
                </Typography>
                <Typography color='textPrimary' variant="h5">
                  Subject : {message.subject}
                </Typography>
                <Typography color='textPrimary' variant="h5">
                  Date : {message.updatedAt}
                </Typography>
                <Box mt={2} mb={2}>
                  <Divider />
                </Box>        
                <Box display="flex">               
                  <Typography variant="h5">
                    Attachments : &nbsp;&nbsp;&nbsp;
                  </Typography>
                  <Typography color='textSecondary' variant="h5">
                    <a style={{color:"white"}} href={message.attachmentsURL[0]}>{message.attachments[0]}</a>
                  </Typography>
                </Box>  
                <Box mt={2} mb={2}>
                <Divider />
                </Box>
                <Typography color='textPrimary' variant="h5">
                    Content : 
                  </Typography>
                  <Typography color='textSecondary' variant="h6">
                    {message.description}
                  </Typography>
                <Box mt={2} mb={2}>
                <Divider />
                </Box>     
                <Box style={{textAlign : "right"}}>               
                <Button onClick={() => setOpen(false)}>Close</Button>
                </Box> 
              </CardContent>
          </Card>
        </Fade>
        </Modal>
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
