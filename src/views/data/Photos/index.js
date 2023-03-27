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

  const getLogs = useCallback(() => {
    axios
      .get('/api/user/data/photos')
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

  return (
    <Page
      className={classes.root}
      title="Photos"
    >
      <Container maxWidth={false}>
        {/* <Header /> */}
        {logs && (
          <Box mt={3}>
            <Results customers={logs} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default CustomerListView;
