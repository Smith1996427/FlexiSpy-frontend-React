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
import wait from 'src/utils/wait';
import PhoneInput from 'react-phone-number-input/input'
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'
import ReactInputVerificationCode from "react-input-verification-code";



const useStyles = makeStyles(() => ({
  root: {},
  phonInput : {
    fontSize : "16px", 
    width : '100%', 
    marginTop:"16px", 
    padding:"18px", 
    borderRadius : "5px",
    backgroundColor : "rgba(0,0,0,0)",
    border :"solid 1px grey",
    color : "currentColor"
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
    setValue(formatPhoneNumberIntl(e));
  }

 const handleVerify = () => {
  setVerify(true);
  enqueueSnackbar("Please input verification code!", {
    variant: 'success',
  }); 
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
console.log(value)
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
            className={classes.phonInput}
             placeholder="Enter phone number"
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
              <ReactInputVerificationCode
              length={6}
              autoFocus
              placeholder=""
              onChange={handleconfirm}
            />
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
