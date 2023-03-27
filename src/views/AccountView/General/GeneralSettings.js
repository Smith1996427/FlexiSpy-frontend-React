import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { addUserPhoneNumbers } from 'src/actions/userPhoneNumbersActions';
// import wait from 'src/utils/wait';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'
import ReactInputVerificationCode from "react-input-verification-code";
import 'react-phone-number-input/style.css';



const useStyles = makeStyles(() => ({
  root: {},
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
      outline : "none"
    }
  }
}));

function GeneralSettings({ user, phone, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [addPhone, setAddPhone] = useState("");
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

const handleback = () => {
  setVerify(false);
};

const handleconfirm = (e) => {
  // setLoading(true);
  // await wait(2000);
  // setLoading(false);


  // setVerify(false);
  // enqueueSnackbar("You added a phone successfully!", {
  //   variant: 'success',
  // }); 

   if(e.length >= 6)
   {
      enqueueSnackbar("your verification success!", {
        variant: 'success',
       }); 
       dispatch(addUserPhoneNumbers(value));
       setVerify(false);
   }
     
    // 
 };

  return (
   
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              {(!verify) && (!loading) &&
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="User Name"
                    name="username"
                    disabled
                    type="text"
                    value="zhen zhen"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Current Phone Number"
                    name="currentPhone"
                     disabled
                    type="text"
                    value={phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  {/* <TextField
                    fullWidth
                    label="Add new phone number"
                    name="newNumber"
                    type="number"
                    onChange={handleAddPhone}
                    value={addPhone}
                    variant="outlined"
                  /> */}

             <PhoneInput
             className={classes.phoneInputcontainer}
             name = "phonInput"
             value={value}
             onChange={(e) => handlePhone(e)}
            />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
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
                      Add Phone
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              }
              {(verify)  && 
              //  <Grid container justify='space-between' spacing={1}>
              //  <Grid item md={2} xs = {2}>
              //  <TextField
              //     fullWidth
              //     name="code"
              //     margin="normal"
              //     type="number"
              //     variant="outlined"
              //   />               
              //  </Grid>
              //  <Grid item md={2} xs = {2}>
              //  <TextField
              //     fullWidth
              //     name="code"
              //     margin="normal"
              //     type="number"
              //     variant="outlined"
              //   />               
              //  </Grid>
              //  <Grid item md={2} xs = {2}>
              //  <TextField
              //     fullWidth
              //     name="code"
              //     margin="normal"
              //     type="number"
              //     variant="outlined"
              //   />               
              //  </Grid>
              //  <Grid item md={2} xs = {2}>
              //  <TextField
              //     fullWidth
              //     name="code"
              //     margin="normal"
              //     type="number"
              //     variant="outlined"
              //   />               
              //  </Grid>
              //  <Grid item md={2} xs = {2}>
              //  <TextField
              //     fullWidth
              //     name="code"
              //     margin="normal"
              //     type="number"
              //     variant="outlined"
              //   />               
              //  </Grid>
              //  <Grid item md={2} xs = {2}>
              //  <TextField
              //     fullWidth
              //     name="code"
              //     margin="normal"
              //     type="number"
              //     variant="outlined"
              //   />               
              //  </Grid>
              //  <Grid item>
              //   <Button
              //     color="secondary"
              //     size="small"
              //     variant="contained"
              //     onClick={() => handleback()}
              //   >
              //     Back
              //   </Button>
              //  </Grid>
              //  <Grid item>
              //   <Button
              //     color="secondary"
              //     size="small"
              //     variant="contained"
              //     onClick={() => handleconfirm()}
              //   >
              //     Confirm
              //   </Button>
              //  </Grid>
              // </Grid>
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
