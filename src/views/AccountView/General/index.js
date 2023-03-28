import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import GeneralSettings from './GeneralSettings';

const useStyles = makeStyles(() => ({
  root: {minHeight : "500px", marginTop : "30"}
}));

function General({ className, ...rest }) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.account);
  const { phone } = useSelector((state) => state.currentPhone);

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
        <GeneralSettings phone = {phone} user={user} />
    </Grid>
  );
}

General.propTypes = {
  className: PropTypes.string
};

export default General;
