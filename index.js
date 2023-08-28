// import redux from 'redux' if this was a react application
const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = "CAKE_ORDERED"

function orderCake(){
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}

const initialState = {
    numOfCakes: 10
}

// (previousState, action) => newState

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        default:
            return state
    }
 }

 const store = createStore(reducer)
 console.log('Initial state', store.getState())