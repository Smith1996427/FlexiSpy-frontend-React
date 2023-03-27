/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  UPDATE_USER
} from 'src/actions/accountActions';

const initialState = {
  users:
    {
      id: '5e86809283e28b96d2d38537',
      avatar: '/static/from_db/avatar/me.png',
      phonenumber : '+1 234 567 8987',
      name : "zhen zhen",
      role: 'agent',
    }
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_USER: {
      const { users } = action.payload;

      return produce(state, (draft) => {
        draft.users = users;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
