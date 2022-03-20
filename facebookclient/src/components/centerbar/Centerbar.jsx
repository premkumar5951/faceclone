import React, { useEffect, useState } from 'react'
import Fbshare from '../fbshare/Fbshare'
import "./centerbar.css"
import Postcard from "../postcard/Postcard"
import { createSelector } from 'reselect'
import { makeSelector } from '../../reducers/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../reducers/actions'
import { getPosts } from '../../auth/getposts'
const PF=process.env.REACT_APP_PUBLIC_URL

const stateSelector =createSelector(makeSelector,(user)=>({
  user
}))

export default function Centerbar({username,sameuser,profileUser}) {
const {user}=useSelector(stateSelector)
const allposts=useSelector((state)=>state.userPosts)
const[profileposts,setprofileposts]=useState([])
const dispatch=useDispatch()
console.log(profileposts)
useEffect(()=>{
getPosts(dispatch,user,username,setprofileposts)
},[])
console.log(sameuser)
  return (
    <div className="centerbar">
    
      {username?<>{sameuser?<Fbshare username={username} setprofileposts={setprofileposts}/>:null}
     {profileposts.map((onepost)=><Postcard username={username} profileUser={profileUser} setprofileposts={setprofileposts}  key={onepost._id} post={onepost}/>)}</>:<><Fbshare/>{allposts.post.map((onepost)=><Postcard  key={onepost._id} post={onepost} />)}</>}
    </div>
  )
}
