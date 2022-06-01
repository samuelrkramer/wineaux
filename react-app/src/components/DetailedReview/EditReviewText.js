import React, { useState } from "react";
import { useDispatch } from "react-redux";

import './EditReviewText.css';
import { editReview } from '../../store/reviews';


function EditReviewText({ review, setInEdit }) {
    const dispatch = useDispatch();

    const [newText, setNewText] = useState(review.text);

    const saveEdit = () => {
        const newReview = review;
        newReview.text = newText;
        dispatch(editReview(newReview));
        setInEdit(false);
    }

    const cancelEdit = () => {
        setInEdit(false)
    }

    return (
        <div id="dr-review-text-edit">
            <textarea
                onChange={e => setNewText(e.target.value)}
                value={newText}
                autoFocus={true}
            />
            <div id="dr-review-text-button-container">
                <button id="dr-review-text-save" onClick={saveEdit}>Save</button>
                <button id="dr-review-text-cancel" onClick={cancelEdit}>Cancel</button>
            </div>
        </div>
    )
}

export default EditReviewText;