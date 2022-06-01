import React from "react";
import FeedReview from "../FeedReview";

const ReviewFeedContainer = (reviews) => {
  return (
    <div id='main_review_feed'>
      {reviews.reviews.map((review) => {
        return (
          <FeedReview review={review[1]} key={review[1].id}/>
        )
      })}
    </div>
  )
}

export default ReviewFeedContainer
