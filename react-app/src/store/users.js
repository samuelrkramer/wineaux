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

// EDIT USER BIO
export const editBio = (userId, bio) => async (dispatch) => {
  const user = await fetch(`/api/users/profile/${userId}`)
  console.log(user)
  // const response = await fetch(`/api/users/profile/${userId}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(review)
  // })

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
