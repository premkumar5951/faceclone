import {
    ActionTypes
} from "./constants";


const defaultState = {
    user: [],
}
export default function userDetailReducer(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.SET_USERS:
            return {
                ...state, user: action.payload
            }
            default:
                return state;
    }
}
const DefaultAuth = "";
export function userAuthReducer(state = DefaultAuth, {
    type,
    payload
}) {
    switch (type) {
        case ActionTypes.SET_AUTH:
            const newState = payload;
            return newState
        default:
            return state
    }
}
const initialData = {
    isfetching: false,
    error: false,
    fetched:false,
}
export function fetchReducer(state = initialData, action) {
    switch (action.type) {
        case ActionTypes.FETCH_START:
            return {
                isfetching: true,
                    error: false,
                    fetched:false,
            }
        case ActionTypes.FETCH_SUCCESS:
            return {
                isfetching: false,
                    error: false,
                    fetched:true,
            }
            case ActionTypes.FETCH_FAILURE:
                return {
                isfetching: false,
                    error: action.payload,
                    fetched:false,
            }
            default:return state
    }
}

const initialDatabtn = {
    btnfetching: false,
    btnerror: false,
    btnfetched:false,
}
export function fetchReducerbtn(state = initialDatabtn, action){
    switch(action.type){
        case ActionTypes.BTN_FETCH_START:
            return {
                btnfetching: true,
                    btnerror: false,
                    btnfetched:false,
            }
        case ActionTypes.BTN_FETCH_SUCCESS:
            return {
                btnisfetching: false,
                    btnerror: false,
                    btnfetched:true,
            }
            case ActionTypes.BTN_FETCH_FAILURE:
                return {
                btnisfetching: false,
                    btnerror: action.payload,
                    btnfetched:false,
            }
            default:return state
    }
}
const defaultposts = {
    post: [],
}
export function userPosts(state = defaultposts, action) {
    switch (action.type) {
        case ActionTypes.SET_POSTS:
            return {
                ...state, post: action.payload
            }
            default:
                return state;
    }
}