/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  UPDATE_PHONE
} from 'src/actions/currentPhoneActions';

const initialState = {
  phone: "+1 234 567 8987"
};

const accountReducer = (state = initialState, action) => {

  switch (action.type) {

    case UPDATE_PHONE: {
      const  phone  = action.payload;

      return produce(state, (draft) => {
        draft.phone = phone;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
