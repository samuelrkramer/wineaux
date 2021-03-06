import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editPic } from '../../store/users';
import { editPicSession } from '../../store/session'

import './UserProfile.css';

const PicEditField = ({ user, setInEdit}) => {
  const dispatch = useDispatch();

  const [newUrl, setNewUrl] = useState(user.profile_image_url);

  const saveEdit = () => {
    const userId = user.id
    let regex = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(png|gif|webp|jpeg|jpg)/i
    if (!newUrl.match(regex)) {
      dispatch(editPic(userId, ''));
      dispatch(editPicSession(''));
    } else {
      dispatch(editPic(userId, newUrl));
      dispatch(editPicSession(newUrl))
    }
    setInEdit(false);
  }

  const cancelEdit = () => {
    setInEdit(false)
  }

  return (
    <div id="profile_pic_edit_container">
            <div>Change Profile Picture</div>
            <input
                onChange={e => setNewUrl(e.target.value)}
                value={newUrl || ''}
                autoFocus={true}
                id='profile_pic_edit_input'
            ></input>
            <div id="dr-review-text-button-container" className='bio_edit_container'>
                <button id="dr-review-text-save" onClick={saveEdit}>Save</button>
                <button id="dr-review-text-cancel" onClick={cancelEdit}>Cancel</button>
            </div>
        </div>
  )
}

export default PicEditField
