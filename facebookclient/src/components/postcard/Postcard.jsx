import React, { useEffect, useState } from 'react'
import "./Postcard.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimeAgo from 'timeago-react';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelector } from '../../reducers/selectors';
import { createSelector } from 'reselect';
import { setPosts } from '../../reducers/actions';
import { getPosts } from '../../auth/getposts';
import LongMenu from '../dropdown/editmenu';
import FormDialog from '../modals/modals';

const stateSelector =createSelector(makeSelector,(user)=>({
  user
}))

const PFP=process.env.REACT_APP_PUBLIC_URL_POSTS
const PF=process.env.REACT_APP_PUBLIC_URL
const PFPERSON=process.env.REACT_APP_PUBLIC_URL_PERSON

export default function Postcard({post,username,setprofileposts,profileUser}) {
const {user}=useSelector(stateSelector)
const dispatch=useDispatch()
const [controlLikes,setlikes]=useState(post.likes.length)
const [postuser,setuserpost]=useState([])
const [isliked,setisliked]=useState(post.likes.includes(user._id))
const [sameuser, setsameuser] = useState(true);

useEffect(()=>{
  try{
    (async()=>{
      const res=await fetch(`/users?userId=${post.userId}`,{
        method:'GET',
        headers:{
          Accept:"application/json",
          "Content-type":"application/json"
        },
      })
      const data=await res.json()
      setuserpost(data)
    })()
  }catch(e){
    console.log(e)
  }
},[post])

   const like=async(e)=>{
     console.log(e.detail)
     if(e.detail===1){
      const res=await fetch(`/posts/${post._id}/like`,{
        method:'PUT',
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({userId:user._id})
      })
      const data=await res.json()
     if(res.status==200)
     {
       console.log(data)
      if(isliked){

        setlikes((controlLikes)-1)
        setisliked(false)
      }else{
        setlikes((controlLikes)+1)
        setisliked(true)
      }
     }else{
       console.log(data)
     }}
    }
    useEffect(()=>{
if(postuser._id!==user._id){
setsameuser(false)
}else{
setsameuser(true)
}
    })
  return (
    <div className="postcard" >
      <div className="postwrapper">
      <div className="outertop">
        <div className="posttop">
    <img src={postuser.profilepic?`${PFPERSON}/${postuser.profilepic}`:`${PFPERSON}/nouser.png`} alt="" className="postimg"/>
    <span className="username">{postuser.username}</span>
    <span className="posttime"><TimeAgo
  datetime={post.createdAt}
/></span>
        </div>
       {sameuser?<LongMenu post={post} username={username} profileUser={profileUser} setprofileposts={setprofileposts}/>:null} 
        </div>
        <div className="caption">
          <p className="postdesc">{post.desc}</p>
        </div>
        <div className="mainmgdiv">
          <img src={post.img?`${PFP}/${post.img}`:null} alt="" className="mainimg"/>
        </div>
<div className="postbottom">
  <div className="bottomleft">
<img src="/assets/love.png" alt="" className="postlove" onClick={like} />
<span className="likecount">{controlLikes} people liked this</span>
  </div>
  <div className="bottomright">
<span className="commentcount">
  4 comments
</span>
  </div>
</div>
      </div>
    </div>
  )
}
