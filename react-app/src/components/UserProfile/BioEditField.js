import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editBio } from '../../store/users';

import './UserProfile.css';

const BioEditField = ({ user, setInEdit}) => {
  const dispatch = useDispatch();

  const [newText, setNewText] = useState(user.bio);

  const saveEdit = () => {
      const newUser = user;
      newUser.bio = newText;
      dispatch(editBio(newUser));
      setInEdit(false);
      const alert = document.getElementById("update-rating-alert")
      alert.style.display = "block"
      setTimeout(() => {
          alert.style.display = "none"
      }, 2000)
  }

  const cancelEdit = () => {
    setInEdit(false)
  }

  return (
    <div id="bio_text_edit_container">
            <textarea
                onChange={e => setNewText(e.target.value)}
                value={newText}
                autoFocus={true}
            />
            <div id="dr-review-text-button-container">
                <button id="dr-review-text-save" onClick={saveEdit}>Save</button>
                <button id="dr-review-text-cancel" onClick={cancelEdit}>Cancel</button>
            </div>
        </div>
  )
}

export default BioEditField
