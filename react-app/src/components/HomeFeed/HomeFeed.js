import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from "../../store/reviews";
import { getAllWines, getOneWine } from "../../store/wines";
import MainWineFeed from "../MainWineFeed";
import ReviewFeedContainer from '../ReviewFeedContainer'
import MiniWineFeed from "../MiniWineFeed";

import './HomeFeed.css'

const HomeFeed = () => {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const wines = useSelector(state => state.wines.allWines)
  const reviews = useSelector(state => state.reviews.allReviews)
  const [allWines, setAllWines] = useState(Object.values(wines))
  const [newReviews, setNewReviews] = useState(Object.entries(reviews).reverse())
  const [selectedWine, setSelectedWine] = useState(allWines)
  const [selectedReviews, setSelectedReviews] = useState(reviews)

  const updateSelected = (id) => {
    setSelectedWine(parseInt(id))
    dispatch(getOneWine(id))
    setSelectedReviews(Object.entries(reviews).filter(([key,value])=> {
      return value.wine.id === parseInt(id)
    }).reverse())
  }

  useEffect(() => {
    setSelectedReviews(Object.entries(reviews).filter(([key,value])=> {
      return value.wine.id === parseInt(selectedWine)
    }).reverse())
  },[reviews, selectedWine])

  console.log('selectedWine', selectedWine)


  useEffect(async () => {
    await dispatch(getAllWines())
      .then(() => setAllWines(Object.values(wines)))
      .then(() => dispatch(getAllReviews()))
      .then(() => setNewReviews(Object.entries(reviews).reverse()))
      .then(() => setSelectedReviews(Object.entries(reviews).filter(([key,value])=> {
      return value.wine.id === parseInt(selectedWine)
    }).reverse()))
      .then(() => setLoaded(true))
  }, [dispatch])


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
          <MiniWineFeed wines={allWines} setWine={updateSelected} /> :
          null
        }
      </div>
      <div id='home_reviews_container'>
        <div id='reviews_title_text'>Latest Reviews</div>
        {selectedReviews && <ReviewFeedContainer reviews={reviews} />}
      </div>
    </div>
  )
}

export default HomeFeed
