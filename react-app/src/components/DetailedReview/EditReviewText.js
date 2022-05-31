import React, { useState } from "react";
import { useDispatch } from "react-redux";

import './EditReviewText.css';
import { editReview } from '../../store/reviews';


function EditReviewText({ review, setInEdit }) {
    const dispatch = useDispatch();

    const [newText, setNewText] = useState(review.text);

    const saveEdit = () => {
        // console.log('are we here?')
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
            />
            <div id="dr-review-text-save" onClick={saveEdit}>Save</div>
            <div id="dr-review-text-cancel" onClick={cancelEdit}>Cancel</div>
        </div>
    )
}

export default EditReviewText;