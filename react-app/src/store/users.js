const GET_ONE_USER = 'users/GET/ONE';
const EDIT_BIO = 'users/EDIT/BIO';

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

// EDIT USER BIO
export const editBio = (userId, bio) => async (dispatch) => {
  const user = await fetch(`/api/users/profile/${userId}`)
  user.bio = bio
  const response = await fetch(`/api/users/profile/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })

  if (response.ok) {
    const editBio = await response.json();
    await dispatch(editBioAction(editBio.bio));
    return editBio;
  }
  return response.code;
}

const editBioAction = (bio) => ({
  type: EDIT_BIO,
  bio
})

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
    case EDIT_BIO:
      newState = Object.assign({}, state);
      newState.currentUserProfile.bio = action.bio;
      return newState;
    default:
      return state;
  }
}

export default userReducer;
