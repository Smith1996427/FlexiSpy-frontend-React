import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import BasicForm from './BasicForm';
// import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function FormikView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Formik Form"
    >
      <Container  maxWidth={false}>
      {/* <Header /> */}
        <Box mt={5}>
          <Grid container style={{justifyContent : "center"}}>
            <Grid
              item
              xs={12}
              md={6}
            >
              <BasicForm />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default FormikView;
