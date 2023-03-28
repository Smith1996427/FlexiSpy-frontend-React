import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { addUserPhoneNumbers } from 'src/actions/userPhoneNumbersActions';
 import wait from 'src/utils/wait';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'
import ReactInputVerificationCode from "react-input-verification-code";
import 'react-phone-number-input/style.css';
import Security from '../Security';


const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100
  },
  phoneInputcontainer : {
    fontSize :20,
    "& .PhoneInputCountry" : {
      margin :16
    },
    "& .PhoneInputInput" : {
      fontSize : 24,
      padding : 7,
      border : "none",
      borderBottom : "solid 1px grey",
      outline : "none",
      backgroundColor : "rgba(0,0,0,0)",
      color : theme.palette.text.secondary
    }
  },
  textFiledColor : {
    color : theme.palette.text.primary
  }
}));

function GeneralSettings({ user, phone, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [verify, setVerify] = useState(false);

  const [loading, setLoading] = useState(false);

  const [value,  setValue] = useState();

  const handlePhone = (e) => {
    setValue(e);
  }

 const handleVerify = () => {
  if(isValidPhoneNumber(value))
  {
    setVerify(true);
    enqueueSnackbar("Please input verification code!", {
      variant: 'success',
    }); 
  }
  else{
    enqueueSnackbar("Invalid phone number!", {
      variant: 'error',
    }); 
  }
}

const handleconfirm = (e) => {

   if(e.length >= 6)
   {
      enqueueSnackbar("your verification success!", {
        variant: 'success'
       }); 
       dispatch(addUserPhoneNumbers(value));
       setVerify(false);
   }

 };

  return (
   
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            {/* <CardHeader title="Profile" />
            <Divider /> */}
            <CardContent>

            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              textAlign="center"
            >
              <Avatar
                className={classes.avatar}
                src={user.avatar}
              />
              <Typography
                className={classes.name}
                gutterBottom
                variant="h3"
                color="textPrimary"
              >
                {`${user.firstName} ${user.lastName}`}
              </Typography>
            </Box>
              {(!verify) && (!loading) &&
              <>
              <Grid
                container
                spacing={3}
              >
                {/* <Grid
                  item
                  md={5}
                  xs={12}
                > */}
                  {/* <TextField
                    fullWidth
                    className={classes.textFiledColor}
                    name="username"
                    disabled
                    type="text"
                    value="Current Phone Number"
                    style={{border : "none", outline : "none"}}
                  /> */}
                  {/* <Typography style={{textAlign : "right"}}>Current</Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    className={classes.textFiledColor}
                    name="currentPhone"
                     disabled
                    type="text"
                    value={phone}
                  />
                </Grid> */}
                <Grid
                  item
                  md={9}
                  xl = {9}
                  xs={9}
                >
                    <PhoneInput
                    className={classes.phoneInputcontainer}
                    name = "phonInput"
                    value={value}
                    onChange={(e) => handlePhone(e)}
                    />
                </Grid>
                <Grid
                  item
                  md={3}
                  xl = {3}
                  xs={3}
                >
                  <Box
                    p={2}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleVerify()}
                    >
                      Add
                    </Button>
                  </Box>
                </Grid>               
              </Grid>
              <Security />
              </>
              }
              {(verify)  && 
              <Box display="flex">
              <ReactInputVerificationCode
              length={6}
              autoFocus
              placeholder=""
              onChange={handleconfirm}
              />
              <Button
              color="secondary"
              variant="contained"
              size='small'
              onClick={() => setVerify(false)}
              style={{marginLeft : "35px", height : "50px", marginTop : "16px"}}
            >
              Back
             </Button>
            </Box>
              } 
              {(loading)  &&
              <CircularProgress />
              }
            </CardContent>
            <Divider />
          </Card>
  );
}

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
