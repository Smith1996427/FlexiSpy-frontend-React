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
 const handleconfirm = (e) => {    
  //  var receive = e;
   
  if(e.length >= 6)
  // {
  //    enqueueSnackbar("your verification code invalid!", {
  //      variant: 'error',
  //     }); 
  // }
{ enqueueSnackbar("your code has been verified. Please login again!", {
   variant: 'success',
 }); 
  history.push('/app/login');}
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
        </Box>
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h2"
              color="textPrimary"
            >
              Sign up
            </Typography>
            {(!verify) &&
            <Typography variant="subtitle1">
              Please sign up on the flexiSPY
            </Typography>
            }
             {(verify) &&
            <Typography variant="subtitle1">
              Please input verification code
            </Typography>
            }
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
                  Have you account yet?
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
