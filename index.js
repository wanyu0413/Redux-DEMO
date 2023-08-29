// import redux from 'redux' if this was a react application
const redux = require('redux')
const createStore = redux.createStore
const binActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

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

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20,
// }

const initialCakeState = {
    numOfCakes: 10,
}
const initialIceCreamState = {
    numOfIceCreams: 20,
}

// (previousState, action) => newState

const CakeReducer = (state = initialCakeState, action) => {
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
        default:
            return state
    }
 }
const IceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
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
        // case CAKE_ORDERED:
        //     return {
        //         ...state,
        //         numOfIceCreams: state.numOfIceCreams.numOfIceCreams - 1,
        //     }
        // Each reducer can update only its portion of the application state. However, it can respond to any action dispatched in the application
        default:
            return state
    }
 }

const rootReducer = combineReducers({
    cake: CakeReducer,
    iceCream: IceCreamReducer,
})

 const store = createStore(rootReducer, applyMiddleware(logger))
 console.log('Initial state', store.getState())

//  const unsubscribe = store.subscribe(() =>  console.log('update state', store.getState()))
 const unsubscribe = store.subscribe(() =>  {}) // with middleware createLogger

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
// ====== with Middleware ======
// action CAKE_ORDERED @ 10:38:09.180
//    prev state { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }
//    action     { type: 'CAKE_ORDERED', payload: 1 }
//    next state { cake: { numOfCakes: 9 }, iceCream: { numOfIceCreams: 20 } }
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
// ====== with Middleware ======
// action CAKE_RESTOCKED @ 10:38:09.187
//    prev state { cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 20 } }
//    action     { type: 'CAKE_RESTOCKED', payload: 3 }
//    next state { cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(2)
 
 unsubscribe()
