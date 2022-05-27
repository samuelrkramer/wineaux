import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './DetailedReview.css';
import { getOneReview } from '../../store/reviews'

function DetailedReview() {
    const dispatch = useDispatch();

    const { reviewId } = useParams();

    const review = useSelector(state => state.reviews.singleReview);

    useEffect(() => {
        dispatch(getOneReview(reviewId));
    }, [dispatch, reviewId])

    if (!review.id) {
        return <h1>Loading</h1>
    }

    console.log(review);

    return (
        <div id="detailed-review-hero">
            <div id="detailed-review-content">
                <div id="detailed-review-userinfo">
                    {review.firstname} {review.lastname}
                </div>
                <div id="detailed-review-cont***">

                </div>
            </div>

        </div>
    )
}

export default DetailedReview;