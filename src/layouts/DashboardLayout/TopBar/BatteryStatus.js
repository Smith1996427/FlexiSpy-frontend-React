import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import {
  useDispatch,
  // useSelector
} from 'react-redux';
import {
  Box,
  IconButton,
  Popover,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BatteryCharging as BatteryChargingIcon
} from 'react-feather';
import { getNotifications } from 'src/actions/notificationsActions';


const useStyles = makeStyles((theme) => ({
  popover: {
    width: 320
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

function Notifications() {
  const classes = useStyles();
  // const notifications = useSelector((state) => state.notifications.notifications);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <>
      <Tooltip title="Battery status">
        <IconButton
          color="inherit"
          ref={ref}
          onClick={handleOpen}
        >
          <SvgIcon>
            <BatteryChargingIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box p={2}>
          <Typography
            variant="h5"
            color="textPrimary"
          >
            Battery Status
          </Typography>
        </Box>
          <Box p={2}>
            <Typography
              variant="h6"
              color="textPrimary"
            >
              Charging : 75%
            </Typography>
          </Box>
      </Popover>
    </>
  );
}

export default Notifications;
