import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileIcon from "./ProfileIcon";
import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
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
            <li>Welcome {user.first_name}!</li>
            <li>
              <NavLink to={`/users/${sessionUser.id}`} className='profileButton'>Profile</NavLink>
            </li>
            <li>
              <button onClick={logout} className='profileButton'>Log Out</button>
            </li>
          </ul>
        </>
      )}
      </div>
  );
}

export default ProfileButton;
