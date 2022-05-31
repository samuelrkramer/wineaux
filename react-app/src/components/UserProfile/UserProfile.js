import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from "../../store/reviews";
import { getAllWines } from "../../store/wines"

import './UserProfile.css'

const UserProfile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [displayName, setDisplayName] = useState('')
  const { userId }  = useParams();
  const userReviews = useSelector(state => state.reviews.allReviews)
  const userWines = useSelector(state => state.wines)
  // this state variable loads only the reviews left by the specific user for this profile page into an array
  const [specificUserReviews, setSpecificUserReviews] = useState(Object.entries(userReviews).filter(([key, value]) => {
    return value.user.id === userId
  }))

  // loads current user for profile page into store as 'User' on page load based on url params
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
      setDisplayName(`${user.first_name} ${user.last_name[0]}`)
    })();
  }, [userId]);

  // loads all reviews into store on profile page load
  useEffect(() => {
    dispatch(getAllReviews())
    dispatch(getAllWines())
    setSpecificUserReviews(Object.entries(userReviews).filter(([key, value]) => {
      return value.user.id == userId
    }))
  }, [dispatch])

  const profilePic = user.profile_image_url

  if (!userId) {
    return null;
  }

  return (
  <>
    <div id='profile_name_text'>Profile For {displayName}.</div>
      <div id='main_profile_div'>
        <div id='pic_detail_div'>
          <div id='profile_page_pic'style={{
                backgroundImage: `url(${profilePic})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}>
          </div>
          <div id='user_details'>
            {user.location ? <div>Location: {user.location} </div> : null}
            <div>Reviews: {specificUserReviews.length} </div>
          </div>
        </div>
          <div id='user_bio'>
            <div>Bio:</div>
            <div>{user.bio}</div>
        </div>
    </div>
  </>
  );
}

export default UserProfile
