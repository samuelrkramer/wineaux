import React, { useState } from "react";
import FeedReview from "../FeedReview";

const ReviewFeedContainer = (reviews) => {
  const [newReviews, setNewReviews] = useState(reviews.reviews)

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
