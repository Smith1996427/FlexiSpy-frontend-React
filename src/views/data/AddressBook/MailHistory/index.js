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
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';
// import { useParams } from 'react-router-dom';


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
  const isMountedRef = useIsMountedRef();
  const [logs, setLogs] = useState(null);

  // const params = useParams();
  // var Id = params.id;

  const getLogs = useCallback(() => {
    axios
      .get('/api/user/data/messages/list/5e887a62195cc5aef7e8ca5d')
      .then((response) => {
        if (isMountedRef.current) {
          setLogs(response.data.customers);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getLogs();
  }, [getLogs]);

  if (!logs) {
    return null;
  }

  const info = {
    name : logs.name,
    avatar : logs.avatar,
    phone : logs.phoneNumber
  }
  return (
    <Page
      className={classes.root}
      title="Email Messages"
    >
      <Container maxWidth={false}>
        <Header contacter = {info}/>
        {logs && (
          <Box mt={3}>
            <Results customers={logs.history} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default CustomerListView;
