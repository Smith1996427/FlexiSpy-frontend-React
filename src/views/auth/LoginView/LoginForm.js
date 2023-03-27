import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  makeStyles
} from '@material-ui/core';
import { login } from 'src/actions/accountActions';
import { useSnackbar } from 'notistack';
import {
  User as UserIcon,
  Unlock as UnLockIcon,
} from 'react-feather';



const useStyles = makeStyles(() => ({
  root: {},
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
}));

function LoginForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        email: "zhen zhen",
        password: 'admin'
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('User Name is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(login(values.email, values.password));
          onSubmitSuccess();
        } catch (error) {
          
          if(error.response && error.response.data.message)
          enqueueSnackbar("User name or password incorrect. Please check again!", {
            variant: 'error',
          }); 
          else
          setErrors({ submit: 'Something went wrong' });  
          setStatus({ success: false });     
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
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Box display="flex">
              <UserIcon className={classes.Icon}/>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  autoFocus
                  helperText={touched.email && errors.email}
                  label="User Name"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                />
          </Box>
          <Box display="flex">
              <UnLockIcon className={classes.Icon}/>
                <TextField
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
          <Box mt={2}  textAlign="center">
            <Button
              color="secondary"
              disabled={isSubmitting}
              size="large"
              type="submit"
              variant="contained"
              style={{width :  "50%"}}
            >
              Log In
            </Button>
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

LoginForm.defaultProps = {
  onSubmitSuccess: () => {}
};

export default LoginForm;
