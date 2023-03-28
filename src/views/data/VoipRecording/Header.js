import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Grid,
  SvgIcon,
  Switch,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Search as SearchIcon
} from 'react-feather';
import { useState } from 'react';

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
  }
}));

function Header({ className, ...rest }) {
  const classes = useStyles();

  const [recordAllow, setRecordAllow] = useState(false);

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
        <Typography variant="h5" color='textPrimary' style={{paddingRight : "20px", paddingTop : "5px"}}>Enable Call Record : </Typography>
        <Switch
          checked={recordAllow}
          edge="start"
          name="recordAllow"
          onChange={() => {setRecordAllow(!recordAllow)}}
        />
        <Button
          color="secondary"
          variant="contained"
          className={classes.action}
          component = {RouterLink}
          to = "/app/data/call/log/search"
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <SearchIcon />
          </SvgIcon>
          Search
        </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
