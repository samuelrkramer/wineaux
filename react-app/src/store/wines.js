const GET_WINES = 'wines/GET';
const GET_ONE_WINE = 'wine/GET/ONE';
const NEW_WINE = 'wine/NEW';
const EDIT_WINE = 'wine/EDIT'
const DELETE_WINE = 'wine/DELETE'

// GET ALL WINES
export const getAllWines = () => async (dispatch) => {

    const response = await fetch('/api/wines/')
    if (response.ok) {
        const wines = await response.json();
        dispatch(allWinesAction(wines));
        return wines
    }

    return response.code; // ERROR HANDLING?
}

const allWinesAction = (wines) => ({
    type: GET_WINES,
    wines
})

// GET ONE WINE
export const getOneWine = (wineId) => async (dispatch) => {
    const response = await fetch(`/api/wines/${wineId}`);

    if (response.ok) {
        const wine = await response.json();
        dispatch(oneWineAction(wine));
        return wine;
    }

    return response.code; // ERROR HANDLING?
}

const oneWineAction = (wine) => ({
    type: GET_ONE_WINE,
    wine
})

// POST NEW WINE
export const uploadNewWine = (wine) => async (dispatch) => {
    const response = await fetch('/api/wines', {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ****** MIGHT NEED TO COME BACK TO THIS
        body: JSON.stringify(wine)
    })

    if (response.ok) {
        const newWine = await response.json();
        dispatch(newWineAction(newWine));
        console.log("###############")
        console.log(newWine)
        return newWine;
    }

    return response.code; // ERROR HANDLING?
}

const newWineAction = (wine) => ({
    type: NEW_WINE,
    wine
})

// EDIT A WINE
export const editWine = (wine) => async (dispatch) => {
    const response = await fetch(`/api/wines/${wine.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, // ****** MIGHT NEED TO COME BACK TO THIS
        body: JSON.stringify(wine)
    })

    if (response.ok) {
        const editWine = await response.json();
        dispatch(editWineAction(editWine));
        return editWine;
    }

    return response.code; // ERROR HANDLING?
}

const editWineAction = (wine) => ({
    type: EDIT_WINE,
    wine
})

// DELETE A WINE
export const deleteWine = (wineId) => async (dispatch) => {
    const response = await fetch(`/api/wines/${wineId}`, {
        method: "DELETE"
    }); // DO WE NEED TO REMOVE CSRF?

    if (response.ok) {
        dispatch(deleteWineAction(wineId))
    }
}

const deleteWineAction = (wineId) => ({
    type: DELETE_WINE,
    wineId
})


const initialState = {
    allWines: {},
    singleWine: {},
};

const wineReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_WINES:
            newState = Object.assign({}, state);
            action.wines.wines.forEach(wine => {
                newState.allWines[wine.id] = wine
            });
            return newState;
        case GET_ONE_WINE:
            newState = Object.assign({}, state);
            newState.singleWine = action.wine;
            return newState;
        case NEW_WINE:
            newState = Object.assign({}, state);
            newState.allWines[action.wine.id] = action.wine;
            return newState;
        case EDIT_WINE:
            newState = Object.assign({}, state);
            newState.allWines[action.wine.id] = action.wine;
            return newState;
        case DELETE_WINE:
            newState = Object.assign({}, state);
            delete newState.allWines[action.wineId];
            return newState;
        default:
            return state;
    }
}

export default wineReducer;
