import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  Avatar,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Divider,
  Link,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LockIcon from '@material-ui/icons/Lock';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import LoginForm from './LoginForm';
import wait from 'src/utils/wait';

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
  },
  backButton: {
    marginLeft: theme.spacing(2)
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  icon: {
    backgroundColor: colors.green[500],
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64
  },
  media: {
    opacity : 0.6,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));

function LoginView() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmitSuccess = async() => {
    setLoading(true);
    await wait(1500);
    history.push('/app');
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container maxWidth="md">
       {(loading) &&
      <Box
        display="flex"
        justifyContent="center"
        my={5}
      >
        <CircularProgress />
      </Box>
        }
        {(!loading) &&
        <>
        <Box
          mb={8}
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
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Avatar className={classes.icon}>
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h2"
              color="textPrimary"
            >
              Sign in
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              Sign in on the flexiSPY 
            </Typography>
            <Box mt={2}>
              <Alert
                severity="info"
              >
                <div>
                  Use
                  {' '}
                  <b>zhen zhen</b>
                  {' '}
                  and password
                  {' '}
                  <b>admin</b>
                </div>
              </Alert>
            </Box>
            <Box mt={3}>
              <LoginForm onSubmitSuccess={handleSubmitSuccess} />
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
            <Grid container justify='space-between'>
            <Grid item>
            <Link
              component={RouterLink}
              to="/forgot"
              variant="body2"
              color="textSecondary"
            >
              Forgot password?
            </Link>
            </Grid>
            <Grid item>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Create new account
            </Link>
            </Grid>
            </Grid>
          </CardContent>
          <CardMedia
            className={classes.media}
            image="/static/from_db/auth.png"
            title="Cover"
          >
          </CardMedia>
        </Card>
        </>
       }
      </Container>
    </Page>
  );
}

export default LoginView;
