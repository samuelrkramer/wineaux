import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./NewReview.css";
import addPhoto from "../../images/addPhoto.png"
import ToggleReview from "../ToggleReview/ToggleReview";
import { uploadNewReview } from "../../store/reviews"

function NewReview() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { wineId } = useParams();

    const user = useSelector(state => state.session.user);

    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        const newReview = {
            user_id: user.id,
            wine_id: parseInt(wineId),
            text,
            rating,
            image_url: url
        }

        dispatch(uploadNewReview(newReview))
        history.push(`/wines/${wineId}`)
    }

    const handleCancel = () => {
        history.push(`/wines/${wineId}`)
    }

    return (
        <div id="nr-hero">
            <div id="nr-form">
                <div className="nr-banner">
                    <div className="nr-banner-text">New review</div>
                    <button id="nr-banner-cancel" onClick={handleCancel}>Cancel</button>
                </div>
                <div id="nr-content-wrapper">
                    <textarea
                        id="nr-text"
                        value={text}
                        onChange={((e) => setText(e.target.value))}
                        placeholder="What do you think?"
                    />
                    <div id="nr-image-input">
                        <div id="nr-icon-container">
                            <img src={addPhoto} alt="" id="nr-icon" />
                        </div>
                        <input
                            placeholder="Image url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
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
                <div id="nr-img-container">
                    {url && (
                        <img id="nr-img" src={url} alt="" />
                    )}
                </div>
            </div>
        </div>
    )

}

export default NewReview