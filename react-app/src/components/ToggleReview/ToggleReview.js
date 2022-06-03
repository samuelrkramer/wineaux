import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './ToggleReview.css';
import { editReview } from '../../store/reviews'

function ToggleReview({ rating, canEdit, containerId, action, setRating }) {
    const dispatch = useDispatch();

    const review = useSelector(state => state.reviews.singleReview);

    const displayRating = rating => {
        let reviews = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                reviews.push((<div className={`review-glass rating-full dr-rating-${canEdit}`} id={i} key={i} onClick={handleEdit} />))
            } else {
                reviews.push((<div className={`review-glass rating-empty dr-rating-${canEdit}`} id={i} key={i} onClick={handleEdit} />))
            }
        }
        return reviews;
    }

    const handleEdit = async (e) => {
        if (!canEdit) return;

        if (action === "edit") {
            const newReview = Object.assign({}, review);
            newReview.rating = e.target.id;
            await dispatch(editReview(newReview));
            const alert = document.getElementById("update-rating-alert")
            alert.style.display = "block"
            setTimeout(() => {
                alert.style.display = "none"
            }, 2000)
        } else if (action === "new") {
            setRating(e.target.id)
        }
    }

    useEffect(() => {
        const reviewContainer = document.getElementById(containerId);
        if (reviewContainer && canEdit) {
            const glasses = document.getElementsByClassName("review-glass");
            for (let glass of glasses) {
                glass.addEventListener("mousemove", (e) => {
                    const mousePosition = e.pageX
                    toggleVisibility(mousePosition, glasses)
                })
            }
            reviewContainer.addEventListener("mouseleave", () => {
                let i = 1
                for (let glass of glasses) {
                    glass.classList.remove("glass-opacity")
                    if (i <= rating) {
                        glass.classList.add("rating-full")
                        glass.classList.remove("rating-empty")
                    } else {
                        glass.classList.remove("rating-full")
                        glass.classList.add("rating-empty")
                    }
                    i++;
                }
            })
        }
    }, [rating, canEdit, containerId])

    const toggleVisibility = (position, glasses) => {
        for (let i = 0; i < 5; i++) {
            const middle = (glasses[i].getBoundingClientRect().left + glasses[i].getBoundingClientRect().right) / 2 - 10;
            if (position < middle) {
                glasses[i].classList.add("glass-opacity")
                glasses[i].classList.remove("rating-full")
                glasses[i].classList.add("rating-empty")
            } else {
                glasses[i].classList.remove("glass-opacity")
                glasses[i].classList.add("rating-full")
                glasses[i].classList.remove("rating-empty")
            }
        }
    }

    return (
        <>
            <div id="update-rating-alert">
                Rating updated!
            </div>
            {displayRating(rating)}
        </>
    )

}

export default ToggleReview;