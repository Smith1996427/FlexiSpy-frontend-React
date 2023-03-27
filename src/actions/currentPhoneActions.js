
export const UPDATE_PHONE = '@currentPhone/update-phone';


export function updateProfile(phone) {

  return (dispatch) => {
     dispatch({
      type: UPDATE_PHONE,
      payload: phone
    });
  };
}
