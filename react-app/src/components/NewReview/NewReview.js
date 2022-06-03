import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./NewReview.css";
import addPhoto from "../../images/addPhoto.png"
import ToggleReview from "../ToggleReview/ToggleReview";
import { uploadNewReview } from "../../store/reviews"
import { getOneWine } from "../../store/wines";

function NewReview() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { wineId } = useParams();

    const user = useSelector(state => state.session.user);
    const wine = useSelector(state => state.wines.singleWine);

    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [rating, setRating] = useState(0);
    const [textError, setTextError] = useState("");
    const [urlError, setUrlError] = useState("");
    const [ratingError, setRatingError] = useState("");

    useEffect(() => {
        dispatch(getOneWine(wineId))
    }, [dispatch, wineId])

    useEffect(() => {
        if (rating === 0) {
            setRatingError("Review must have a rating. At least give it a 1...")
        } else {
            setRatingError("");
        }
    }, [rating])

    const handleSubmit = () => {
        if (!textError && !urlError && !ratingError) {
            const newReview = {
                user_id: user.id,
                wine_id: parseInt(wineId),
                text,
                rating,
                image_url: url
            }
            dispatch(uploadNewReview(newReview));
            history.push(`/wines/${wineId}`);
        }
    }

    const textChange = (e) => {
        setText(e.target.value);
        if (e.target.value.length > 180) {
            setTextError("Review text must be 180 characters or less");
        } else {
            setTextError("");
        }
    }

    const urlChange = (e) => {
        setUrl(e.target.value);
        if (e.target.value.length > 1000) {
            setUrlError("Photo URL must be 1000 characters or less");
        } else {
            setUrlError("");
        }

    }

    const handleCancel = () => {
        history.push(`/wines/${wineId}`);
    }

    if (!wine.id) {
        return <h1>Loading</h1>
    }

    return (
        <div id="nr-hero">
            <div id="nr-wineinfo-container">
                <img id="nr-wine-img" src={wine.image_url} alt="" />
                <div id="nr-wineinfo">
                    <div id="nr-wine-name">{wine.name}</div>
                    <div id="nr-wine-year">{wine.year}</div>
                </div>
            </div>
            <div id="nr-form">
                <div className="nr-banner">
                    <div className="nr-banner-text">New review</div>
                    <button id="nr-banner-cancel" onClick={handleCancel}>Cancel</button>
                </div>
                <div id="nr-content-wrapper">
                    <div id="nr-textarea-container">
                        <textarea
                            id="nr-text"
                            value={text}
                            onChange={textChange}
                            placeholder="What do you think?"
                        />
                        <div id="nr-remaining-chars">{180 - text.length}</div>
                    </div>
                    <div id="nr-image-input">
                        <div id="nr-icon-container">
                            <img src={addPhoto} alt="" id="nr-icon" />
                        </div>
                        <input
                            placeholder="Image url"
                            value={url}
                            onChange={urlChange}
                        />
                    </div>
                    <div id="nr-rating-container">
                        <ToggleReview rating={rating} setRating={setRating} canEdit={true} containerId="nr-rating-container" action="new" />
                    </div>
                    <button
                        id="nr-submit"
                        onClick={handleSubmit}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
            <div id="nr-errors-container">
                {textError && <div className="nr-error" >{textError}</div>}
                {urlError && <div className="nr-error" >{urlError}</div>}
                {ratingError && <div className="nr-error" >{ratingError}</div>}
            </div>
            <div id="nr-img-container">
                {url && !urlError && (
                    <img id="nr-img" src={url} alt="" />
                )}
            </div>
        </div>
    )

}

export default NewReview