import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneUser } from "../../store/users";
import { getAllReviews } from "../../store/reviews";
import line_break from '../../images/line_break.png';
import MiniWineFeed from "../MiniWineFeed";
import ReviewFeedContainer from '../ReviewFeedContainer'
import BioEditField from "./BioEditField";



import './UserProfile.css'

const UserProfile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const userProfile = useSelector(state => state.users)
  const reviews = useSelector(state => state.reviews.allReviews)
  const [userWines, setUserWines] = useState([])
  const [userReviews, setUserReviews] = useState([])
  const [inTextEdit, setInTextEdit] = useState(false);


  useEffect(() => {
    dispatch(getOneUser(userId));
    dispatch(getAllReviews());
  }, [dispatch, userId])


  useEffect(() => {
    setUser(userProfile.currentUserProfile);
    setUserWines(userProfile.currentUserProfile.wines)
    setUserReviews(Object.entries(reviews).filter(([key, value]) => {
      return value.user.id === parseInt(userId)
    }))
  },[userProfile.currentUserProfile, user, userId, reviews])

  useEffect(() => {
    if (!userReviews.length) {
    setUserReviews(Object.entries(reviews).filter(([key, value]) => {
      return value.user.id === parseInt(userId)
    }))
  }
  },[userReviews, userId, reviews])



  const profilePic = user.profile_image_url

  const canEdit = sessionUser.id === user.id ? true : false;
  console.log('can edit', canEdit)

  const textEdit = () => {
    if (!canEdit) return
    setInTextEdit(true);
  }

  if (!userId) {
    return <h1>Loading</h1>;
  }

  return (
  <>
    <div id='profile_name_text'>Profile For {user.first_name} {user.last_name}</div>
      <div id='main_profile_div'>
        <div id='pic_detail_div'>
          <div id='profile_page_pic' style={{
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
          {!user.bio ? <button onClick={textEdit}>Add Bio</button> : null }
          {inTextEdit ?
            <BioEditField user={user} setInEdit={setInTextEdit} /> :
            <div id={`bio_text_${canEdit}`} onClick={textEdit}>{user.bio}</div>
          }

        </div>
        <div><img src={line_break} className='line_break' alt='Line Break' ></img></div>
    </div>
    {userWines && userWines.length ?
    <>
      <div id='discoveries_title'>Discoveries</div>
      <div id='mini_wine_feed_container'>
        <MiniWineFeed wines={userWines} />
      </div>
    </>
    : null}
    {user.reviews && user.reviews.length ?
      <>
        <div id='reviews_title'>Reviews</div>
        <ReviewFeedContainer reviews={userReviews}/>
      </>
    : null}
  </>
  );
}

export default UserProfile
