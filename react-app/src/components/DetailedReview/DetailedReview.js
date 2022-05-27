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

    return (
        <div id="dr-hero">
            <div id="dr-content">
                <div id="dr-userinfo">
                    <div id="dr-userinfo-img-container">
                        <img id="dr-userinfo-img" src={review.user.profile_image_url} alt="" />
                    </div>
                    <div id="dr-userinfo-name">
                        {review.user.first_name} {review.user.last_name}
                    </div>
                </div>
                <div id="dr-body">
                    <div id="dr-wineinfo-container">
                        <img id="dr-wine-img" src={review.wine.image_url} alt="" />
                        <div id="dr-wineinfo">
                            <div id="dr-wine-name">{review.wine.name}</div>
                            <div id="dr-wine-year">{review.wine.year}</div>
                        </div>
                    </div>
                    <div id="dr-wine-rating">{review.wine.rating}</div>
                    <div id="dr-review-date">{review.updatedAt}</div>
                </div>
            </div>
            <div id="dr-img-container">
                <img id="dr-img" src={review.image_url} alt="" />
            </div>

        </div>
    )
}

export default DetailedReview;