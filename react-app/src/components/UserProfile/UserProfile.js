import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneUser } from "../../store/users";
import { getAllReviews } from "../../store/reviews";
import line_break from '../../images/line_break.png';
import MiniWineFeed from "../MiniWineFeed";
import ReviewFeedContainer from '../ReviewFeedContainer'
import BioEditField from "./BioEditField";
import editIcon from "../../images/edit-icon.png"
import PicEditField from "./PicEditField";



import './UserProfile.css'

const UserProfile = () => {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const userProfile = useSelector(state => state.users)
  const reviews = useSelector(state => state.reviews.allReviews)
  const [userWines, setUserWines] = useState(userProfile.currentUserProfile.wines)
  const [userReviews, setUserReviews] = useState(Object.entries(reviews).filter(([key, value]) => {
    return value.user.id === parseInt(userId)
  }))
  const [inTextEdit, setInTextEdit] = useState(false);
  const [inPicEdit, setInPicEdit] = useState(false);


  useEffect(() => {
    dispatch(getOneUser(userId))
      .then (() => setUser(userProfile.currentUserProfile))
      .then (() => setUserWines(userProfile.currentUserProfile.wines))
      .then (() => dispatch(getAllReviews()))
      .then(() => setUserReviews(Object.entries(reviews).filter(([key, value]) => {
        return value.user.id === parseInt(userId)
      }).reverse()))
      .then(()=> setLoaded(true))
  }, [dispatch, userId])


  useEffect(() => {
    setUser(userProfile.currentUserProfile);
    setUserWines(userProfile.currentUserProfile.wines)
    setUserReviews(Object.entries(reviews).filter(([key, value]) => {
      return value.user.id === parseInt(userId)
    }).reverse())
  },[userProfile.currentUserProfile, user, userId, reviews])

  useEffect(() => {
    const setReviews = setTimeout(() => {
      setUserReviews(Object.entries(reviews).filter(([key, value]) => {
      return value.user.id === parseInt(userId)
    }))}, 1000)
  },[])


  const profilePic = user.profile_image_url

  const canEdit = sessionUser.id === user.id ? true : false;

  const textEdit = () => {
    if (!canEdit) return
    setInTextEdit(true);
  }

  const updateProfilePic = () => {
    if (!canEdit) return
    setInPicEdit(!inPicEdit)
  }

  if (!loaded) {
    return (
    <div className='loaderr'>
        <h1>Loading...</h1>
    </div>
    )
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
          {canEdit ?
          <div id='edit_profile_pic'>
            <button onClick={updateProfilePic}><img src={editIcon} className='edit_icon'/></button>
          </div> : null
          }
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
        {inPicEdit ? <div><PicEditField user={user} setInEdit={setInPicEdit}/></div>: null}
        <div id='user_bio'>
          <div id='bio_title'>About Me:</div>
          {!user.bio && canEdit ? <button onClick={textEdit}>Add Bio</button> : null }
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
