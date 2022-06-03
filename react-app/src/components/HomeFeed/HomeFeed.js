import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from "../../store/reviews";
import { getAllWines } from "../../store/wines";
import MiniWineFeed from "../MiniWineFeed";
import ReviewFeedContainer from '../ReviewFeedContainer'

import './HomeFeed.css'

const HomeFeed = () => {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const wines = useSelector(state => state.wines.allWines)
  const reviews = useSelector(state => state.reviews.allReviews)
  const [allWines, setAllWines] = useState(Object.values(wines).reverse())
  const [newReviews, setNewReviews] = useState(Object.entries(reviews).reverse())


  useEffect(async () => {
    await dispatch(getAllWines())
      .then(() => setAllWines(Object.values(wines).reverse()))
      .then(() => dispatch(getAllReviews()))
      .then(() => setNewReviews(reviewSort(Object.entries(reviews).reverse())))
      .then(() => setLoaded(true))
  }, [dispatch])

  const reviewSort = (reviews) => {
    reviews.sort((a,b) => {
      (b[1].created_at, a[1].created_at)
      return b[1].created_at - a[1].created_at
    })
    console.log(reviews)
    return reviews
  }


  if (!loaded) {
    return (
      <div className='loaderr'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div id='home_main_div'>
      <div id='home_wines_container'>
        <div id='wines_title_text'>Explore Wines</div>
        {allWines ?
          <MiniWineFeed wines={allWines} /> :
          null
        }
      </div>
      <div id='home_reviews_container'>
        <div id='reviews_title_text'>Latest Reviews</div>
        {newReviews ?
          <ReviewFeedContainer reviews={newReviews} /> :
          null
        }
      </div>
    </div>
  )
}

export default HomeFeed
