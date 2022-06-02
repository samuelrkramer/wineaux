import React, { useState } from "react";
import { useDispatch } from "react-redux";

import './EditReviewImg.css'
import { editReview } from '../../store/reviews'

function EditReviewImg({ review, toggle }) {
    const dispatch = useDispatch();

    const [url, setUrl] = useState("");

    const saveEdit = () => {
        const newReview = Object.assign({}, review);
        newReview.image_url = url;
        dispatch(editReview(newReview));
        toggle(false);
    }

    const cancelEdit = () => {
        toggle(false);
    }

    return (
        <div id="dr-edit-img-modal">
            <div id="editImg-opacity" />
            <div id="editImg-form">
                <input
                    type="text"
                    id="editImg-form-input"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="New image url"
                />
                <div id="editImg-button-container">
                    <button
                        onClick={saveEdit}
                        id="editImg-save"
                    >
                        Save New Image
                    </button>
                    <button
                        onClick={cancelEdit}
                        id="editImg-cancel"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditReviewImg;