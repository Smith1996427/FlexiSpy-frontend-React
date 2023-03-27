import React, {
  useRef,
  useState
} from 'react';
import {
  useDispatch,
   useSelector
} from 'react-redux';
import {
  Box,
  TextField
} from '@material-ui/core';
import { updateProfile } from 'src/actions/currentPhoneActions';


// const useStyles = makeStyles((theme) => ({
//   popover: {
//     width: 320
//   },
//   icon: {
//     backgroundColor: theme.palette.secondary.main,
//     color: theme.palette.secondary.contrastText
//   }
// }));


function Notifications() {
  // const classes = useStyles();
  // const notifications = useSelector((state) => state.notifications.notifications);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");

  const { phoneNumbers } = useSelector((state) => state.userPhones);

  const handleChange = (e) => {
     setPhone(e.target.value)
    dispatch(updateProfile(e.target.value));
  }

  return (
    <Box padding={1}>
    <TextField
    name="phone"
    onChange={handleChange}
    select
    SelectProps={{ native: true }}
    value={phone}
  >
    {phoneNumbers.map((state) => (
      <option
        key={state}
        value={state}
      >
        {state}
      </option>
    ))}
  </TextField>
  </Box>
  );
}

export default Notifications;
