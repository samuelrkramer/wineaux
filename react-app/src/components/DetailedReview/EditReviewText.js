import React, { useState } from "react";
import { useDispatch } from "react-redux";

import './EditReviewText.css';
import { editReview } from '../../store/reviews';


function EditReviewText({ review, setInEdit }) {
    const dispatch = useDispatch();

    const [newText, setNewText] = useState(review.text ? review.text : "");
    const [error, setError] = useState("");

    const saveEdit = () => {
        if (newText.length > 180) {
            setError("Review must be 180 characters or less")
        } else {
            const newReview = Object.assign({}, review);
            newReview.text = newText;
            dispatch(editReview(newReview));
            setInEdit(false);
        }
    }

    const cancelEdit = () => {
        setInEdit(false)
    }

    return (
        <div id="dr-text-edit-hero">
            <div id="dr-textarea-container">
                <textarea
                    id="dr-edit-textarea"
                    onChange={e => setNewText(e.target.value)}
                    value={newText}
                    autoFocus={true}
                />
                <div id="remaining-chars">{180 - newText.length}</div>
            </div>
            <div id="dr-text-edit-button-container">
                {error && <div id="dr-text-edit-error">{error}</div>}
                <button id="dr-review-text-save" onClick={saveEdit}>Save</button>
                <button id="dr-review-text-cancel" onClick={cancelEdit}>Cancel</button>
            </div>
        </div>
    )
}

export default EditReviewText;