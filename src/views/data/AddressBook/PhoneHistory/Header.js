import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  ArrowLeft as ArrowLeftIcon
} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  avtar : {
    width : "50px",
    height : 50,
   marginRight : "25px"
  }
}));

function Header({ className, contacter, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
      </Grid>
      <Grid item>
      <Box display="flex">
        <Avatar className={classes.avtar} src={contacter.avatar} />
        <Grid>
        <Typography color='textPrimary'>{contacter.name}</Typography>
        <Typography color='textSecondary'>{contacter.phone}</Typography>
        </Grid>
      </Box>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          className={classes.action}
          component = {RouterLink}
          to = "/app/data/addressbook"
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <ArrowLeftIcon />
          </SvgIcon>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
