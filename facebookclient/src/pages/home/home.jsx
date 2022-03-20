import React, { useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar"
import Centerbar from "../../components/centerbar/Centerbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import Bottombar from '../../components/bottombar/Bottombar'
import auth from "../../auth/auth";
import { createSelector } from "reselect";
import { makeSelector } from "../../reducers/selectors";
import { useDispatch, useSelector } from "react-redux";
import { setUser,SetAuth } from "../../reducers/actions";
import { useNavigate } from "react-router";
import Loading from "../../components/loading/Loading";
import CircularProgress from '@mui/material/CircularProgress';
import Login from "../login/Login";



const stateSelector =createSelector(makeSelector,(user)=>({
  user
}))
const actionDispatch=(dispatch)=>({
  setUser:(user)=>dispatch(setUser(user))
})
export default function Home() {
  const {isfetching,error,fetched}=useSelector((state)=>state.fetched)
  const posts=useSelector((state)=>state.userPosts)
  const history=useNavigate()
  const {user}=useSelector(stateSelector)
  const { setUser}= actionDispatch(useDispatch())
  const Authenticate=useSelector((state)=>state.userAuth)
  const dispatch=useDispatch()
 console.log(user._id)
  useEffect(()=>{
    if(Authenticate!=true){
      auth(dispatch,SetAuth,setUser,history)
    }
    },[])
useEffect(() => {
}, []);
  return (
   <>
   {isfetching?<Loading/>:<>
   <div className="outerhome">
    <Topbar />
      <div className="mainbody">
        <Sidebar/>
        <Centerbar/>
        <Rightbar/>
      </div>
      </div>
      <Bottombar/></>}
    </>
  );
}
