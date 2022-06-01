import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from "../../store/reviews";
import { getAllWines } from "../../store/wines"
import { getOneUser } from "../../store/users";
import line_break from '../../images/line_break.png';
import MiniWineFeed from "../MiniWineFeed";



import './UserProfile.css'

const UserProfile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const userProfile = useSelector(state => state.users)
  const [userWines, setUserWines] = useState([])
  // const userReviews = useSelector(state => state.reviews.allReviews)
  // const userWines = useSelector(state => state.wines.allWines)

  // const [specificUserWines, setSpecificUserWines] = useState(Object.entries(userWines).filter(([key, value]) => {
  //   return value.user.id === parseInt(userId)
  // }))

  // console.log(userProfile.wines)


  // this state variable loads only the reviews left by the specific user for this profile page into an array
  // const [specificUserReviews, setSpecificUserReviews] = useState(Object.entries(userReviews).filter(([key, value]) => {
  //   return value.user.id === parseInt(userId)
  // }))

  useEffect(() => {
    dispatch(getOneUser(userId));
  }, [dispatch])

  useEffect(() => {
    setUser(userProfile.currentUserProfile);
    setUserWines(userProfile.currentUserProfile.wines)
  },[userProfile.currentUserProfile, user])

  // runs a dispatch until the reviews are returned
  // useEffect(() => {
  //   if (!specificUserReviews.length) {
  //     setSpecificUserReviews(Object.entries(userReviews).filter(([key, value]) => {
  //       return value.user.id === parseInt(userId)
  //     }))
  //   }
  //   if (!specificUserWines.length) {
  //     setSpecificUserWines(Object.entries(userWines).filter(([key, value]) => {
  //       return value.user.id === parseInt(userId)
  //     }))
  //   }
  // }, [dispatch(getAllReviews), userId, userReviews, specificUserReviews.length])


  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //     setDisplayName(`${user.first_name} ${user.last_name[0]}`)
  //   })();
  // }, [userId]);

  // loads all reviews into store on profile page load
  // useEffect(() => {
  //   dispatch(getAllReviews())
  //   dispatch(getAllWines())
  //   if (!specificUserReviews.length) {
  //     setSpecificUserReviews(Object.entries(userReviews).filter(([key, value]) => {
  //       return value.user.id === parseInt(userId)
  //     }))
  //   }
  // }, [dispatch, userId, userReviews, specificUserReviews.length])

  const profilePic = user.profile_image_url

  if (!userId) {
    return <h1>Loading</h1>;
  }

  return (
  <>
    <div id='profile_name_text'>Profile For {user.first_name} {user.last_name}</div>
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
            {user.reviews ?
            <>
              <div className='user_info_text'>
                <p className='user_info_title'>Location:&nbsp;</p>
                <p className='user_info_content'>{user.location}</p>
              </div>
              <div className='user_info_text'>
                <p className='user_info_title'>Reviews:&nbsp;</p>
                <p className='user_info_content'> {user.reviews.length}</p>
              </div>
              <div className='user_info_text'>
                <p className='user_info_title'>Unique:&nbsp;</p>
                <p className='user_info_content'> {user.reviews.length}</p>
              </div>
              <div className='user_info_text'>
                <p className='user_info_title'>Discovered:&nbsp;</p>
                <p className='user_info_content'> {user.wines.length}</p>
              </div>
            </>
            : null}
          </div>
        </div>
        <div id='user_bio'>
          <div id='bio_title'>About Me:</div>
          <div>{user.bio}</div>
        </div>
        <div><img src={line_break} className='line_break'></img></div>
    </div>
    <div id='discoveries_title'>Discoveries</div>
    <div id='mini_wine_feed_container'>
      {userWines ? <MiniWineFeed wines={userWines} /> : null}
    </div>
    <div id='reviews_title'>Reviews</div>
  </>
  );
}

export default UserProfile
