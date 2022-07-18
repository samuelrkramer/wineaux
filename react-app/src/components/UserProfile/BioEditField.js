import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editBio } from '../../store/users';

import './UserProfile.css';

const BioEditField = ({ user, setInEdit}) => {
  const dispatch = useDispatch();

  const [newText, setNewText] = useState(user.bio);

  const saveEdit = () => {
      const userId = user.id
      dispatch(editBio(userId, newText));
      setInEdit(false);
  }

  const cancelEdit = () => {
    setInEdit(false)
  }

  return (
    <div id="bio_text_edit_container">
            <textarea
                onChange={e => setNewText(e.target.value)}
                value={newText || ''}
                autoFocus={true}
                maxlength="400"
                id='bio_text_area'
            ></textarea>
            <div id="dr-review-text-button-container" className='bio_edit_container'>
                <button id="dr-review-text-save" onClick={saveEdit}>Save</button>
                <button id="dr-review-text-cancel" onClick={cancelEdit}>Cancel</button>
            </div>
        </div>
  )
}

export default BioEditField
