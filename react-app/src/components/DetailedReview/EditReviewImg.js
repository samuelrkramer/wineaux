import React, { useState } from "react";
import { useDispatch } from "react-redux";

import './EditReviewImg.css'
import { editReview } from '../../store/reviews'

function EditReviewImg({ review, setInImgEdit }) {
    const dispatch = useDispatch();

    const [url, setUrl] = useState("");

    const saveEdit = () => {
        const newReview = review;
        newReview.image_url = url;
        dispatch(editReview(newReview));
        setInImgEdit(false);
    }

    const cancelEdit = () => {
        setInImgEdit(false);
    }

    return (
        <div id="dr-edit-img-modal">
            <div id="newImg-form">
                <input
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
            </div>
            <button
                onClick={saveEdit}
            >
                Save New Image
            </button>
            <button
                onClick={cancelEdit}
            >
                Cancel
            </button>
        </div>
    )
}

export default EditReviewImg;