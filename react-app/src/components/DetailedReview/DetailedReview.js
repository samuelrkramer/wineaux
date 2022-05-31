import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './DetailedReview.css';
import { getOneReview } from '../../store/reviews';
import EditReviewText from './EditReviewText';
import EditReviewImg from './EditReviewImg';
import ratingEmpty from '../../images/ratingEmpty.png';
import ratingFull from '../../images/ratingFull.png';

const displayRating = rating => {
    let reviews = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            reviews.push((<img src={ratingFull} alt="" key={i} />))
        } else {
            reviews.push((<img src={ratingEmpty} alt="" key={i} />))
        }
    }
    return reviews;
}

function DetailedReview() {

    const dispatch = useDispatch();

    const { reviewId } = useParams();

    const review = useSelector(state => state.reviews.singleReview);
    const user = useSelector(state => state.session.user)

    const [inTextEdit, setInTextEdit] = useState(false);
    const [inImgEdit, setInImgEdit] = useState(false);

    useEffect(() => {
        dispatch(getOneReview(reviewId));
    }, [dispatch, reviewId])


    if (!review.id) {
        return <h1>Loading</h1>
    }

    const canEdit = review.user.id === user.id ? true : false;

    const textEdit = (e) => {
        if (!canEdit) return
        setInTextEdit(true);
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
                    <div id="dr-rating-container">
                        {displayRating(review.rating)}
                    </div>
                    <div id="dr-review-date">{review.updatedAt}</div>
                    {inTextEdit ?
                        <EditReviewText review={review} setInEdit={setInTextEdit} /> :
                        <div id={`dr-review-text-${canEdit}`} onClick={textEdit}>{review.text}</div>
                    }
                </div>
            </div>

            {inImgEdit ?
                <EditReviewImg /> :

                // only show next component if an image exists
                review.image_url && (
                    <div id="dr-img-banner">
                        <img id={`dr-img-${canEdit}`} src={review.image_url} alt="" />
                        <button id="dr-img-edit-button">Edit</button>
                    </div>
                )
            }
        </div>
    )
}

export default DetailedReview;