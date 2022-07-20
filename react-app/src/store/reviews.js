// import fetch from 

const GET_REVIEWS = 'reviews/GET';
const GET_ONE_REVIEW = 'review/GET/ONE';
const NEW_REVIEW = 'review/NEW';
const EDIT_REVIEW = 'review/EDIT'
const DELETE_REVIEW = 'review/DELETE'

// GET ALL REVIEWS
export const getAllReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews/')

    if (response.ok) {
        const data = await response.json();
        const reviews = data.reviews
        dispatch(allReviewsAction(reviews));
        return reviews
    }

    return response.code; // ERROR HANDLING?
}

const allReviewsAction = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

// GET ONE REVIEW
export const getOneReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
        const review = await response.json();
        dispatch(oneReviewAction(review));
        return review;
    }

    return response.code; // ERROR HANDLING?
}

const oneReviewAction = (review) => ({
    type: GET_ONE_REVIEW,
    review
})

// POST NEW REVIEW
export const uploadNewReview = (review) => async (dispatch) => {
    const response = fetch('/api/reviews', {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ****** MIGHT NEED TO COME BACK TO THIS
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const newReview = await response.json();
        dispatch(newReviewAction(newReview));
        return newReview;
    }

    return response.code; // ERROR HANDLING?
}

const newReviewAction = (review) => ({
    type: NEW_REVIEW,
    review
})

// EDIT A REVIEW
export const editReview = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, // ****** MIGHT NEED TO COME BACK TO THIS
        body: JSON.stringify(review)
    })


    if (response.ok) {
        const editReview = await response.json();
        await dispatch(editReviewAction(editReview));
        return editReview;
    }

    return response.code; // ERROR HANDLING?
}

const editReviewAction = (review) => ({
    type: EDIT_REVIEW,
    review
})

// DELETE A REVIEW
export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    }); // DO WE NEED TO REMOVE CSRF?

    if (response.ok) {
        dispatch(deleteReviewAction(reviewId))
    }
}

const deleteReviewAction = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})


const initialState = {
    allReviews: {},
    singleReview: {},
};

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            // console.log('review store', action.reviews)
            // console.log('state', state)
            newState = Object.assign({}, state);
            // newState.allReviews = {};
            // console.log('all reviews', newState.allReviews)
            action.reviews.forEach(review => {
                newState.allReviews[review.id] = review
            });
            return newState;
        case GET_ONE_REVIEW:
            newState = Object.assign({}, state);
            newState.singleReview = action.review;
            return newState;
        case NEW_REVIEW:
            newState = Object.assign({}, state);
            newState.allReviews[action.review.id] = action.review;
            return newState;
        case EDIT_REVIEW:
            newState = Object.assign({}, state);
            newState.allReviews[action.review.id] = action.review;
            newState.singleReview = action.review;
            return newState;
        case DELETE_REVIEW:
            newState = Object.assign({}, state);
            delete newState.allReviews[action.reviewId];
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;