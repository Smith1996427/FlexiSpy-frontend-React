import React, {useState} from 'react';
// import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  // Checkbox,
  // FormHelperText,
  TextField,
  // Typography,
  // Link,
  makeStyles
} from '@material-ui/core';
// import { register } from 'src/actions/accountActions';
import { useSnackbar } from 'notistack';
import PhoneInput from 'react-phone-number-input/input';
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';

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

function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [value,  setValue] = useState();

  const handlePhone = (e) => {
    setValue(formatPhoneNumberIntl(e));
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
          if(values.firstName === "zhen zhen")
           {enqueueSnackbar("We sent verification code to your phone", {
            variant: 'success',
          }); 
          onSubmitSuccess();}
          else
          enqueueSnackbar("User name is incorrect!", {
            variant: 'error',
          }); 
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
          <TextField
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
            variant="outlined"
          />
           <PhoneInput
            className={classes.phonInput}
             placeholder="Enter phone number"
             value={value}
             onChange={(e) => handlePhone(e)}
             />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="New Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
           <TextField
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
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
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
