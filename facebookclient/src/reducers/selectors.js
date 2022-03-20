import {createSelector} from "reselect"

const userDetailSelector=(state)=>state.userDetail;
export const makeSelector=createSelector(userDetailSelector,(userDetail)=>userDetail.user);