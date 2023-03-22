import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import wait from 'src/utils/wait';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';

const typeOptions = [
  {
    value: 'callRecording',
    label: 'Call Recording'
  },
  {
    value: 'phoneCall',
    label: 'Phone Calls'
  },
  {
    value: 'contacts',
    label: 'Contacts'
  },
  {
    value: 'messages',
    label: 'Email Messages'
  },
  {
    value: 'voip',
    label: 'VoIP Calls'
  },
  {
    value: 'voipRecording',
    label: 'VoIP Call Recording'
  },
  {
    value: 'visited',
    label: 'Websites Visited'
  }
];

const directionOptionsCallRecord = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'incoming',
    label: 'Incoming'
  },
  {
    value: 'outcoming',
    label: 'Outcoming'
  }
];

const directionOptionsPhoneCall = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'incoming',
    label: 'Incoming'
  },
  {
    value: 'outcoming',
    label: 'Outcoming'
  },
  {
    value: 'missed',
    label: 'Missed Call'
  }
];

const directionOptionsEmailMessages = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'received',
    label: 'Received'
  },
  {
    value: 'Sent',
    label: 'sent'
  }
];

const voipApplication = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'skype',
    label: 'Skype'
  },
  {
    value: 'telegram',
    label: 'Telegram'
  },
  {
    value: 'whatsapp',
    label: 'Whatsapp'
  }
];

function BasicForm() {

  return (
    <Formik
      initialValues={{
        type: 'callRecording',
        direction: '',
        application : '',
        keyword: '',
        end: moment(),
        start: moment()
      }}
      validationSchema={Yup.object().shape({
        end: Yup.date()
        .when(
          'start',
          (start, schema) => (start && schema.min(start, 'End date must be later than start date')),
        ),
      start: Yup.date()
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // Make API request
          await wait(1000);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
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
        setFieldTouched,
        setFieldValue,
        isSubmitting,
        touched,
        values
      }) => (
        <Card>
          <CardHeader title="Advanced search" />
          <Divider />
          <CardContent>
            {isSubmitting ? (
              <Box
                display="flex"
                justifyContent="center"
                my={5}
              >
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                >
                  <Grid
                    item
                    md={10}
                    xs={12}
                  >
                  <TextField
                    fullWidth
                    label="In this record type:"
                    name="type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.type}
                    variant="outlined"
                  >
                    {typeOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  </Grid>
                {(values.type === "voip" || values.type === "voipRecording" ) &&
                  <Grid
                    item
                    md={10}
                    xs={12}
                    mt={2}
                  >
                <Box mt={2}>
                <TextField
                    fullWidth
                    label="In this Voip application:"
                    name="application"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.application}
                    variant="outlined"
                  >
                    {voipApplication.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </TextField>
                </Box>
                </Grid>
                }

                <Grid
                    item
                    md={10}
                    xs={12}
                    mt={2}
                  >
                <Box mt={2}>
                {(values.type === "callRecording") &&
                <TextField
                    fullWidth
                    label="In this direction:"
                    name="direction"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.direction}
                    variant="outlined"
                  >
                    {directionOptionsCallRecord.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </TextField>
                }
                {(values.type === "phoneCall") &&
                <TextField
                    fullWidth
                    label="In this direction:"
                    name="direction"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.direction}
                    variant="outlined"
                  >
                    {directionOptionsPhoneCall.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </TextField>
                }
                  {(values.type === "messages") &&
                <TextField
                    fullWidth
                    label="In this direction:"
                    name="direction"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.direction}
                    variant="outlined"
                  >
                    {directionOptionsEmailMessages.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </TextField>
                }
                {(values.type === "voip") &&
                <TextField
                    fullWidth
                    label="In this direction"
                    name="direction"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.direction}
                    variant="outlined"
                  >
                    {directionOptionsPhoneCall.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </TextField>
                }
                {(values.type === "voipRecording") &&
                <TextField
                    fullWidth
                    label="In this direction:"
                    name="direction"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.direction}
                    variant="outlined"
                  >
                    {directionOptionsCallRecord.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </TextField>
                }

                </Box>
                </Grid>
                <Grid
                    item
                    md={10}
                    xs={12}
                  >
                <Box mt={2}>
                  <TextField
                    fullWidth
                    label="For this keyword"
                    name="keyword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.keyword}
                    variant="outlined"
                  />
                </Box>
                </Grid>
                <Grid
                    item
                    md={11}
                    xs={12}
                  >
                <Box mt={2} display="flex">
                <Grid container spacing={1} >
                <Grid item md={4} xs={12}>
                  <Typography style={{textAlign : "center"}}>
                    For Date Range : 
                  </Typography>
                 </Grid>
                  <Grid item md={4} xs={6}>
                  <DateTimePicker
                      fullWidth
                      inputVariant="outlined"
                      label="Start Date"
                      name="start"
                      onClick={() => setFieldTouched('start')}
                      onChange={(date) => setFieldValue('start', date)}
                      value={values.start}
                    />
                    </Grid>
                    <Grid item md={4} xs={6}>
                    <DateTimePicker
                      fullWidth
                      inputVariant="outlined"
                      label="End Date"
                      name="end"
                      onClick={() => setFieldTouched('end')}
                      onChange={(date) => setFieldValue('end', date)}
                      value={values.end}
                    />
                    </Grid>
                    {Boolean(touched.end && errors.end) && (
                      <Box mt={2}>
                        <FormHelperText error>
                          {errors.end}
                        </FormHelperText>
                      </Box>
                    )}
                  </Grid>
                </Box>
                </Grid>


                </Grid>
                <Box mt={2} style={{textAlign : "right"}} >
                  <Button
                    color="secondary"
                    disabled={isSubmitting}
                    size="medium"
                    type="submit"
                    variant="contained"
                  >
                    Search
                  </Button>
                </Box>
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

export default BasicForm;
