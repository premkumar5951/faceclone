import {createStore,combineReducers,applyMiddleware} from "redux"
import userDetail from "../src/reducers/reducers"
import { userAuthReducer ,fetchReducer,fetchReducerbtn,userPosts} from "../src/reducers/reducers"


const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const reducers=combineReducers({userDetail,userAuth:userAuthReducer,fetched:fetchReducer,fetchedbtn:fetchReducerbtn,userPosts})
export default createStore(reducers ,composeEnhancers)