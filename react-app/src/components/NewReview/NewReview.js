import React, { useState } from "react";

import './NewReview.css';
import '../DetailedReview/DetailedReviewRating.css';

import addPhoto from '../../images/addPhoto.png'
import ToggleReview from "../ToggleReview/ToggleReview";

function NewReview() {

    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [rating, setRating] = useState("");

    const handleSubmit = () => {
        console.log(text, url, rating)
    }

    return (
        <div id="nr-hero">
            <div id="nr-form">
                <div id="nr-banner">
                    <div id="nr-banner-text">Create your new review</div>
                    <button id="nr-banner-cancel">Cancel</button>
                </div>
                <div id="nr-content-wrapper">
                    <textarea
                        id="nr-text"
                        value={text}
                        onChange={((e) => setText(e.target.value))}
                        placeholder="What do you think?"
                    />
                    <div id="nr-image-input">
                        <div id="nr-icon-container" onClick="updatePhoto">
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
            </div>
            <div id="nr-img-container">
                {url && (
                    <img id="nr-img" src={url} alt="" />
                )}
            </div>
        </div>
    )
}

export default NewReview