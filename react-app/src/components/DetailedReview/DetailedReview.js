import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import './DetailedReview.css';
import { getOneReview } from '../../store/reviews';
import EditReviewText from './EditReviewText';
import EditReviewImg from './EditReviewImg';
import ToggleReview from '../ToggleReview';
import { deleteReview } from '../../store/reviews';

function DetailedReview() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { reviewId } = useParams();

    const review = useSelector(state => state.reviews.singleReview);
    const user = useSelector(state => state.session.user)

    const [inTextEdit, setInTextEdit] = useState(false);
    const [inImgEdit, setInImgEdit] = useState(false);
    const [addPhoto, setAddPhoto] = useState(false);

    useEffect(() => {
        dispatch(getOneReview(reviewId));
    }, [dispatch, reviewId])

    if (!review.id) {
        return <h1>Loading</h1>
    }

    const canEdit = review.user.id === user.id ? true : false;

    const textEdit = () => {
        if (!canEdit) return
        setInTextEdit(true);
    }

    const addPhotoPrompt = () => {
        setAddPhoto(true);
    }

    const handleDelete = () => {
        dispatch(deleteReview(reviewId))
        history.push(`/wines/${review.wine.id}`)
    }

    return (
        <div id="dr-hero">
            <div id="dr-content">
                <div id="dr-content-left">
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
                            <div id="dr-wineinfo-left">
                                <img id="dr-wine-img" src={review.wine.image_url} alt="" />
                                <div id="dr-wineinfo">
                                    <div id="dr-wine-name">{review.wine.name}</div>
                                    <div id="dr-wine-year">{review.wine.year}</div>
                                </div>
                            </div>
                            <div id="dr-rating-container">
                                <ToggleReview rating={review.rating} canEdit={canEdit} containerId="dr-rating-container" action="edit" />
                            </div >
                        </div>

                        <div id="dr-review-date">{review.updatedAt}</div>
                        {inTextEdit ?
                            <EditReviewText review={review} setInEdit={setInTextEdit} /> :
                            <div id={`dr-review-text-${canEdit}`} onClick={textEdit}>{review.text}</div>
                        }
                    </div>
                    {canEdit && (
                        <div id="editPage-cue">Mouseover review, rating and photo to edit!</div>
                    )}
                </div>

                <div id="dr-content-right">
                    {review.image_url ? (
                        <div id="dr-img-banner" >
                            <img id="dr-img" src={review.image_url} alt="" />

                            {inImgEdit ?
                                <EditReviewImg review={review} toggle={setInImgEdit} /> :

                                // only show edit button if an image exists
                                canEdit && (
                                    <div id="dr-img-edit-button-container" >
                                        <div id="dr-img-opacity" />
                                        <button
                                            id="dr-img-edit-button"
                                            onClick={() => setInImgEdit(true)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) :
                        <div id="dr-add-image-button-container">
                            {addPhoto ?
                                <EditReviewImg review={review} toggle={setAddPhoto} />
                                :
                                canEdit && (
                                    <button
                                        id="dr-add-image-button"
                                        onClick={addPhotoPrompt}
                                    >
                                        Add Photo
                                    </button>
                                )
                            }
                        </div>
                    }
                    {(canEdit && !addPhoto) && (
                        <div id="dr-delete-button-container">
                            <button
                                id="dr-delete-review-button"
                                onClick={handleDelete}
                            >
                                Delete Review
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default DetailedReview;