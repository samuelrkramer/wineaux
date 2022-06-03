
import React, { useState, useEffect} from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Logo from './Logo';

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);
  const [user, setUser] = useState(false)

  useEffect(() => {
      setUser(sessionUser)
  },[])

  useEffect(() => {
    setUser(sessionUser)
  }, [user, sessionUser])

  return (
    <nav id='nav_bar'>
      <div id='nav_bar_content'>
        <div id='logo'>
          <NavLink exact to="/" className='iconLink'>
            <Logo />
          </NavLink>
          <a id='title_text' href='/'>Wineaux</a>
        </div>
        <div id='links'>
          <div className='nav_link_div'>
            <NavLink to='/' exact={true} activeClassName='active' className='nav_link'>
              Home
            </NavLink>
          </div>
          {
            !user && (
              <>
              <div className='nav_link_div'>
                <NavLink to='/login' exact={true} activeClassName='active' className='nav_link'>
                  Login
                </NavLink>
              </div>
              <div className='nav_link_div'>
                <NavLink to='/sign-up' exact={true} activeClassName='active' className='nav_link'>
                  Sign Up
                </NavLink>
              </div>
              </>
            )
          }
          {
            user && (
              <div className='nav_link_div'>
                <NavLink to='/wines/new' exact={true} activeClassName='active' className='nav_link'>
                  Add Wine
                </NavLink>
              </div>
            )
          }
          <div className='nav_link_div'>
            <NavLink to='/users' exact={true} activeClassName='active' className='nav_link'>
              About
            </NavLink>
          </div>
          </div>
        {
          user && (
            <>
            <div id='profile_button'>
              <ProfileButton user={sessionUser}/>
            </div>
            </>
          )
        }
      </div>
    </nav>
  );
}

export default NavBar;
