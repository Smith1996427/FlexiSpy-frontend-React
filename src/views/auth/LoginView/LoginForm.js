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

const useStyles = makeStyles(() => ({
  root: {}
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
            variant="outlined"
          />
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
