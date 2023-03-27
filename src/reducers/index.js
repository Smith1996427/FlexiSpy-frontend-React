import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import accountsReducer from './accountsReducer';
import notificationsReducer from './notificationsReducer';
import CurrentPhone from './currentPhone';
import userPhones from './userPhonesReducer';


const rootReducer = combineReducers({
  account: accountReducer,
  accounts: accountsReducer,
  notifications: notificationsReducer,
  currentPhone : CurrentPhone,
  userPhones : userPhones
});

export default rootReducer;
