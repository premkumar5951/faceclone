import { ActionTypes } from "./constants"
export const setUser=(user)=>({
        type:ActionTypes.SET_USERS,
        payload:user
})

export const SetAuth=(user)=>({
        type:ActionTypes.SET_AUTH,
        payload:user
})
export const fetchStarted=()=>({
        type:ActionTypes.FETCH_START,
})
export const fetchSuccessful=(data)=>({
        type:ActionTypes.FETCH_SUCCESS,
})
export const fetchFailed=(error)=>({
        type:ActionTypes.FETCH_FAILURE,
        payload:error
})
export const fetchStartedbtn=()=>({
        type:ActionTypes.BTN_FETCH_START,
})
export const fetchSuccessfulbtn=(data)=>({
        type:ActionTypes.BTN_FETCH_SUCCESS,
})
export const fetchFailedbtn=(error)=>({
        type:ActionTypes.BTN_FETCH_FAILURE,
        payload:error
})
export const setPosts=(posts)=>({
        type:ActionTypes.SET_POSTS,
        payload:posts
})