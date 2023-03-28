import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  // Checkbox,
  Grid,
  FormHelperText,
  TextField,
  // Typography,
  // Link,
  makeStyles
} from '@material-ui/core';
// import { register } from 'src/actions/accountActions';
import { useSnackbar } from 'notistack';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import axios from 'src/utils/axios';


import {
  User as UserIcon,
  Unlock as UnLockIcon,
} from 'react-feather';



const useStyles = makeStyles((theme) => ({
  root: {
  },
  textField : {
    "& .MuiInput-underline": {
      borderWidth: 0,
      marginTop : 16,
      padding: 0 // <-- added zero padding instruction
    },
    "& .MuiInput-input" : {
      fontSize : "24px"
    }
  },
  Icon : {
    margin:16,
    marginTop : 37,
    marginLeft : 23,
    marginRight : 32
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
      color : theme.palette.text.primary
    }
  }
}));




function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [value,  setValue] = useState("");

  const handlePhone = (e) => {
     setValue(e);    
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        password: '',
        passwordConfirm: "",
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required('First name is required'),
        password: Yup.string()
        .min(5, 'Must be at least 5 characters')
        .max(255)
        .required('Required'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // await dispatch(register(values));    
           
          if(value === "")
          enqueueSnackbar("Your phone number must be input", {
            variant: 'error',
           })
          else
          {
            if(isValidPhoneNumber(value))
             {              
            // await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=0cbec6807e804fe6a45340510afba64e&phone=${value}`)
            //     .then((response) => {
                    
            //     });         
              enqueueSnackbar("We sent verification code to your phone", {
                variant: 'success',
              })
              onSubmitSuccess();
            }
            else
            { enqueueSnackbar("This is invalid phone number", {
              variant: 'error',
            })
          }
          }
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
         <Box display="flex">
              <UserIcon className={classes.Icon}/>
              <TextField
                className={classes.textField}
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="User Name"
                margin="normal"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="firstName"
                value={values.firstName}
                //  variant="outlined"
              />
          </Box>
          
          <PhoneInput
             className={classes.phoneInputcontainer}
             name = "phonInput"
             value={value}
             onChange={(e) => handlePhone(e)}
          />
          <Box display="flex">
            <UnLockIcon className={classes.Icon}/>
            <TextField
              className={classes.textField}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}          
            />
          </Box>
          <Box display="flex">
           <UnLockIcon className={classes.Icon}/>
           <TextField
              className={classes.textField}
              error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
              fullWidth
              helperText={touched.passwordConfirm && errors.passwordConfirm}
              label="Password Confirmation"
              name="passwordConfirm"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.passwordConfirm}
            />
          </Box>
          <Box mt={2} textAlign="center">
            <Button
              color="secondary"
              disabled={isSubmitting}
              // fullWidth
              size="medium"
              type="submit"
              style={{width :  "25%"}}
              variant="contained"
            >
              Ok
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

RegisterForm.default = {
  onSubmitSuccess: () => {}
};

export default RegisterForm;
