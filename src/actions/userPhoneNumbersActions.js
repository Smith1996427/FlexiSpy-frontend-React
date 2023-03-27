
export const ADD_PHONE = '@phoneNumbers/add-phone';


export function addUserPhoneNumbers(phone) {

  return (dispatch) => {
     dispatch({
      type: ADD_PHONE,
      payload: phone
    });
  };
}
