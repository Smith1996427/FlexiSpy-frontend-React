/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  ADD_PHONE
} from 'src/actions/userPhoneNumbersActions';

const initialState = {
  phoneNumbers: ["+1 234 567 8987"]
};

const accountReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_PHONE: {
      const  phoneNumbers  = action.payload;

      return produce(state, (draft) => {
        draft.phoneNumbers = phoneNumbers;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
