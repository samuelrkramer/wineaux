import React, { useEffect, useState } from "react";
import FeedReview from "../FeedReview";

const ReviewFeedContainer = (reviews) => {
  const [newReviews, setNewReviews] = useState(reviews.reviews)
  console.log('reviews', newReviews)

  useEffect(() => {
    console.log('reviews inner', newReviews)
  },[reviews])

  const update = async (id) => {
    setNewReviews(newReviews.filter((r) => {
      return parseInt(r[0]) !== id
    }))
  }

  return (
    <div id='main_review_feed'>
      {newReviews.map((review) => {
        return (
          <FeedReview review={review[1]} key={review[1].id} update={update}/>
        )
      })}
    </div>
  )
}

export default ReviewFeedContainer
