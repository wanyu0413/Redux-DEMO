// import redux from 'redux' if this was a react application
const redux = require('redux')
const createStore = redux.createStore
const binActionCreators = redux.bindActionCreators

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake(){
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIceCream(qty = 1){
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIceCream(qty = 1){
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}

const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20,
}

// (previousState, action) => newState

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload,
            }
        default:
            return state
    }
 }

 const store = createStore(reducer)
 console.log('Initial state', store.getState())

 const unsubscribe = store.subscribe(() =>  console.log('update state', store.getState()))

//  store.dispatch({
//     type: CAKE_ORDERED,
//     quantity: 1,
// }) --> accepts an action as a parameter

//  store.dispatch(orderCake())
//  store.dispatch(orderCake())
//  store.dispatch(orderCake())
//  store.dispatch(restockCake(3))

const actions = binActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(2)
 
 unsubscribe()
