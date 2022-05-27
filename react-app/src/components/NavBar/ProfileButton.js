import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import ProfileIcon from "./ProfileIcon";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className='dropDownDiv'>
      <button onClick={openMenu} id='profile_button'>
        <ProfileIcon />
      </button>
      {showMenu && (
        <>
          <div id='top_tab'></div>
          <ul className="profile-dropdown">
            {/* <li>{user.username}</li> */}
            {/* <li>{user.email}</li> */}
            <li>
              <button onClick={logout} id='logoutButton'>Log Out</button>
            </li>
          </ul>
        </>
      )}
      </div>
  );
}

export default ProfileButton;
