import React, { useState, useEffect } from "react";
import FeedReview from "../FeedReview";

const ReviewFeedContainer = (reviews) => {
  return (
    <div id='main_review_feed'>
      {reviews.reviews.map((review) => {
        return (
          <FeedReview props={review}/>
        )
      })}
    </div>
  )
}

export default ReviewFeedContainer
