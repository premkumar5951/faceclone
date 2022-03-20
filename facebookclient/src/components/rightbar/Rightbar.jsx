import React, { useEffect, useState } from "react";
import "./rightbar.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { PeopleAlt ,School,Room,Wc} from "@mui/icons-material";
import { getfollowers, getfollowings } from "../../auth/getfollowers";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { makeSelector } from "../../reducers/selectors";
import { NavLink } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';

const stateSelector =createSelector(makeSelector,(user)=>({
  user
}))
const PFPERSON=process.env.REACT_APP_PUBLIC_URL_PERSON

export default function Rightbar({Profile,username,follow}) {
const {user}=useSelector(stateSelector)
const [followers,setfollowers]=useState([])
const [followings,setfollowings]=useState([])

useEffect(()=>{
  try{
getfollowers(setfollowers,username,user)
getfollowings(setfollowings,username,user)
  }catch(e){
    console.log(e)
  }
},[follow])

console.log(followers.length,followings.length)
  const Friends=()=>{
      return(<>
        <div  className='fdiv2'>
        <span className='online mb-1'>
          <h5 className='fw-600 mb-0 mx-1 followhead'>Followings({followings.length})</h5>
        </span>{followings.length===0?<><div className="nofollower">
        <GroupsIcon className="nofollowericon"/><span>No Followings Yet</span>
        </div></>:null}
        <ul className='flists1'>
        {followings.map((onefollowing)=>
        <NavLink key={onefollowing._id} to={`/timeline/${onefollowing.email}`} >
        <li  className='fitems1'>
            <img src={onefollowing.profilepic?`${PFPERSON}/${onefollowing.profilepic}`:`${PFPERSON}/nouser.png`} alt='' />
            {onefollowing.username}
          </li>
          </NavLink>)}
        </ul>
      </div>
      <div  className='fdiv2'>
        <span className='online mb-1'>
          <h5 className='fw-600 mb-0 mx-1 followhead'>Followers({followers.length})</h5>
        </span>{followers.length===0?<><div className="nofollower">
        <GroupsIcon className="nofollowericon"/><span>No Followers Yet</span>
        </div></>:null}
        <ul className='flists1'>
        {followers.map((onefollower)=>
        <NavLink key={onefollower._id} to={`/timeline/${onefollower.email}`} >
        <li  className='fitems1'>
            <img src={onefollower.profilepic?`${PFPERSON}/${onefollower.profilepic}`:`${PFPERSON}/nouser.png`} alt='' />
            {onefollower.username}
          </li>
          </NavLink>)}
        </ul>
      </div></>)
        }    
  const Homepage=()=>{
      return(<> 
          <div className='upperright'>
          <div className='birthday'>
            <img src='assets/gift.png' alt='' className='birthdayimg' />
            <span className='birthdaytext'>
              <b>Prem kumar</b> and <b>2 others</b> have birthdays today!
            </span>
          </div>
        </div>
        <Friends/>
        <hr />
      </>)
  }
  
  
  
  const Profilepage=()=>{
      return(
          <>
          <div className="profilepage">
              <div className="userinfo">
              <h4>About</h4>
                  <span className="info"><Room/>&nbsp;City&nbsp;<b>Kolkata</b></span>
                  <span className="info"><Room/>&nbsp;From&nbsp;<b>Patna,Bihar</b></span>
                  <span className="info"><School/>&nbsp;Goes to&nbsp;<b>Jis College of Engineering</b></span>
                  <span className="info"><Wc/>&nbsp;Relationship&nbsp;<b>Single</b></span>
              </div>
              <Friends/>
          </div>
          </>
      )
  }
  
    return (
    <div className='rightbar'>
      <div className='rightbarwrapper'>
        {Profile?<Profilepage/>:<Homepage/>}
      </div>
      {Profile?null:<div className='ad'>
          <span className='adtext'>
            Visit&nbsp;<b>&nbsp;advertisment</b>&nbsp;{" "}
            <DoubleArrowIcon className='arrow' />
          </span>
          <img src='assets/ad.jpg' alt='' className='adimg' />
        </div>}
      
    </div>
  );
}
