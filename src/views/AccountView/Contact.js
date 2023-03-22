import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Security({ className, ...rest }) {
  const classes = useStyles();

  return (

          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Contact support Password" />
            <Divider />
            <CardContent>
            </CardContent>
          </Card>
  );
}

Security.propTypes = {
  className: PropTypes.string
};

export default Security;
