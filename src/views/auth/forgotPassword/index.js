import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Divider,
  Link,
  Typography,
  TextField,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import RegisterForm from './RegisterForm';
import { useSnackbar } from 'notistack';
import ReactInputVerificationCode from "react-input-verification-code";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80
  }
}));

function RegisterView() {
  const classes = useStyles();
  const history = useHistory();
  const [verify, setVerify] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  const handleconfirm = (e) => {    
    if(e.length >= 6)
    {
       enqueueSnackbar("your verification code invalid!", {
         variant: 'error',
        }); 
    }
  };


  const handleSubmitSuccess = () => {
     setVerify(true)
    enqueueSnackbar("Please input verification code!", {
      variant: 'success',
    }); 
    // history.push('/app/login');
  };

  const handleback = () => {
    setVerify(false);
 };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Container maxWidth="sm">
        <Box
          mb={5}
          display="flex"
          alignItems="center"
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Button
            component={RouterLink}
            to="/"
            className={classes.backButton}
          >
            Back to home
          </Button>
        </Box>
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h2"
              color="textPrimary"
            >
              Forgot Password?
            </Typography>
            <Typography variant="subtitle1">
              We will send a verification code to your phone 
            </Typography>
            <Box mt={3}>
              {(!verify) &&
              <RegisterForm onSubmitSuccess={handleSubmitSuccess} />
               }
               {(verify) &&
                <ReactInputVerificationCode
                length={6}
                autoFocus
                placeholder=""
                onChange={handleconfirm}
              />
               }
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
            <Grid container justify='space-between'>
              <Grid item>
                <Link
                component={RouterLink}
                to="/home"
                variant="body2"
                color="textSecondary"
                >
                  Back to home
                </Link>
              </Grid>
              <Grid item>
                <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                color="textSecondary"
                >
                  Back
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default RegisterView;
