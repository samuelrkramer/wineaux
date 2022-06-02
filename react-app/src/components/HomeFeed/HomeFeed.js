import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from "../../store/reviews";
import { getAllWines } from "../../store/wines";
import MiniWineFeed from "../MiniWineFeed";
import ReviewFeedContainer from '../ReviewFeedContainer'

import './HomeFeed.css'

const HomeFeed = () => {
  const dispatch = useDispatch();

  const wines = useSelector(state => state.wines.allWines)
  const reviews = useSelector(state => state.reviews.allReviews)
  const [allWines, setAllWines] = useState(Object.values(wines))
  const [allReviews, setAllReviews] = useState(reviews)

  console.log('outer reviews', allReviews)


  useEffect(() => {
    dispatch(getAllWines());
    dispatch(getAllReviews());
  }, [dispatch])

  useEffect(() => {
    const setReviews = setTimeout(() => {
      setAllWines(Object.values(wines))
      setAllReviews(reviews)
     }, 1000)
  },[])

  // console.log(allWines)
  // console.log(allReviews)

  return (
    <div id='home_main_div'>
      <div id='home_wines_container'>
        <div id='wines_title_text'>Explore Wines</div>
        {allWines ?
        <MiniWineFeed wines={allWines}/> :
        null
        }
      </div>
      <div id='home_reviews_container'>
        <div id='reviews_title_text'>Latest Reviews</div>
        {/* {allReviews ?
        <ReviewFeedContainer reviews={allReviews}/> :
          null
        } */}
      </div>
    </div>
  )
}

export default HomeFeed
