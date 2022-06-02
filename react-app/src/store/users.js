const GET_ONE_USER = 'users/GET/ONE';
const EDIT_BIO = 'users/EDIT/BIO';
const EDIT_PIC = 'users/EDIT/PIC';

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
  const response = await fetch(`/api/users/profile/bio/${userId}`, {
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

// EDIT USER PROFILE PICTURE
export const editPic = (userId, pic) => async (dispatch) => {
  const user = await fetch(`/api/users/profile/${userId}`)
  user.profile_image_url = pic || 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/209290118-348545419959856-6760331049776615301-n-1635532292.jpeg?crop=1xw:1xh;center,top&resize=480:*'
  const response = await fetch(`/api/users/profile/pic/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })

  if (response.ok) {
    const editPic = await response.json();
    await dispatch(editPicAction(editPic.profile_image_url));
    return editPic;
  }
  return response.code;
}

const editPicAction = (pic) => ({
  type: EDIT_PIC,
  pic
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
    case EDIT_PIC:
      newState = Object.assign({}, state);
      console.log(action)
      newState.currentUserProfile.profile_image_url = action.pic;
      return newState;
    default:
      return state;
  }
}

export default userReducer;
