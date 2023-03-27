import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import ProfileDetails from './ProfileDetails';
import GeneralSettings from './GeneralSettings';

const useStyles = makeStyles(() => ({
  root: {}
}));

function General({ className, ...rest }) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.account);
  const { phone } = useSelector((state) => state.currentPhone);
  const { phoneNumbers } = useSelector((state) => state.userPhones);

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        lg={3}
        md={4}
        xl={3}
        xs={12}
      >
        <ProfileDetails phoneNumbers ={phoneNumbers} phone = {phone} user={user} />
      </Grid>
      <Grid
        item
        lg={8}
        md={8}
        xl={9}
        xs={12}
      >
        <GeneralSettings phone = {phone} user={user} />
      </Grid>
    </Grid>
  );
}

General.propTypes = {
  className: PropTypes.string
};

export default General;
