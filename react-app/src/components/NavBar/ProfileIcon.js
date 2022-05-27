import React from "react";
import './NavBar.css'

const ProfileIcon = (profilePicture) => {
  return (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	    width="86.996px" height="86.996px" viewBox="0 0 86.996 86.996" enableBackground="new 0 0 86.996 86.996">
      <path fill="#4F182E" d="M0,0v43.498c0,24.023,19.475,43.498,43.498,43.498s43.498-19.475,43.498-43.498V0H0z"/>
      <circle fill="#281320" cx="43.498" cy="43.498" r="38.265"/>
      <ellipse fill="#FFFFFF" cx="43.498" cy="32.506" rx="11.526" ry="13.932"/>
      <path fill="#FFFFFF" d="M43.498,44.688c-12.258,0-22.193,10.578-22.193,23.627c0,2.454,0.352,4.82,1.004,7.045
        c6.066,4.043,13.352,6.404,21.189,6.404s15.122-2.361,21.188-6.404c0.652-2.225,1.004-4.591,1.004-7.045
        C65.69,55.266,55.755,44.688,43.498,44.688z"/>
    </svg>
  )
}

export default ProfileIcon
