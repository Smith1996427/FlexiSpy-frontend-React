import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';
import { useDispatch } from 'react-redux';
import { updateUser } from 'src/actions/accountActions';
import { addUserPhoneNumbers } from 'src/actions/userPhoneNumbersActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function CustomerListView() {
  const classes = useStyles();
  const dispatch = useDispatch();

 const handleSelectUsers = (update) => {
  dispatch(updateUser(update));
  if(update === "Jone Smith")
  dispatch(addUserPhoneNumbers(["+1 875 698 4589"]));
  if(update === "Adam")
  dispatch(addUserPhoneNumbers(["+91 6458 55745", "+1 968 547 6542"]));
  if(update === "Dad")
  dispatch(addUserPhoneNumbers(["+1 258 987 4512"]));
  
  };
  
  return (
    <Page
      className={classes.root}
      title="My Users"
    >
      <Container maxWidth={false}>
        {/* <Header /> */}
          <Box mt={3}>
            <Results selectUsers = {handleSelectUsers} />
          </Box>
      </Container>
    </Page>
  );
}

export default CustomerListView;
