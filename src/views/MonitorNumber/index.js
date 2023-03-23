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
  const [number, setNumber] = useState("");

  const getLogs = useCallback(() => {
    axios
      .get('/api/user/monitor/get')
      .then((response) => {
        if (isMountedRef.current) {
          if(response.data.result)
          setNumber(response.data.monitor);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getLogs();
  }, [getLogs]);

  return (
    <Page
      className={classes.root}
      title="Device Number"
    >
      <Container maxWidth={false}>
        <Header />
          <Box mt={3}>
            <Results number={number} />
          </Box>
      </Container>
    </Page>
  );
}

export default CustomerListView;
