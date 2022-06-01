const GET_ONE_USER = 'users/GET/ONE'

// GET ONE USER
export const getOneUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/profile/${userId}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(oneUserAction(user));
    return user;
}

return response.code;
}

const oneUserAction = (user) => ({
  type: GET_ONE_USER,
  user
})

const initialState = {
  currentUserProfile: {}
}

const userReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ONE_USER:
      newState = Object.assign({}, state);
      newState.currentUserProfile = action.user;
      return newState;
    default:
      return state;
  }
}

export default userReducer;
