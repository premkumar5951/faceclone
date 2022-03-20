import React, { useState } from 'react'
import "./Fbshare.css"
import { PermMedia,LocalOffer,LocationOn,EmojiEmotions  } from "@mui/icons-material";
import Button from '@mui/material/Button';
import { createSelector } from 'reselect';
import { makeSelector } from '../../reducers/selectors';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../auth/getposts';

const PF=process.env.REACT_APP_PUBLIC_URL
const stateSelector =createSelector(makeSelector,(user)=>({
  user
}))
const PFPERSON=process.env.REACT_APP_PUBLIC_URL_PERSON

export default function Fbshare({username,setprofileposts}) {
const {user}=useSelector(stateSelector)
const posts=useSelector((state)=>state.userPosts)
const dispatch=useDispatch()
const [sharetext,setsharetext]=useState("")
const [file,setsharepic]=useState(null)

const shareclick=async(e)=>{
  e.preventDefault()
const newpost={
  userId:user._id,
  desc:sharetext
};
if(file || sharetext){
if(file){
  const data=new FormData();
  const filename=Date.now() + file.name;
  data.append('name',filename);
  data.append('cat',"posts");
  data.append('file',file);
  
  newpost.img=filename;
  try{
    const newres=await fetch('/upload/images',{
      method:"POST",
      body:data
    })
    if(newres.status==200){
      setsharepic(null)
    }
  }catch(e){
console.log(e)
  }
}
  try{
  const res=await fetch("/posts/create",{
    method:"POST",
    headers:{
      "content-type":'application/json'
    },
    body:JSON.stringify(newpost)
  })
  const data=await res.json()
  if(res.status==200){
    setsharetext("")
  }
  
}catch(e){
console.log(e)
  }

}
getPosts(dispatch,user,username,setprofileposts)}
  return (
    
    <div className="share">

<form className="sharewrapper">
    <div className="sharetop">
<img  className="shareimg" src={user.profilepic?`${PFPERSON}/${user.profilepic}`:`${PFPERSON}/nouser.png`} alt=""/>
<textarea placeholder="What's in your mind?" rows='1' name="sharetext"  required value={sharetext} onChange={(e)=>setsharetext(e.target.value)}/>
    </div>
    {file?<div className="postimgdiv p-2">
      <img src={URL.createObjectURL(file)} className="postimage" alt=""/>
      <CancelIcon onClick={()=>setsharepic(null)}/>
    </div>:null}
    <hr/>
    <div className="sharebottom">
    <div className="postoptions">
<label className="options" htmlFor="file">
<PermMedia htmlColor="tomato"  className="shareicons"/><span className="optiontext">Photo/video</span>
<input type="file" id="file"  style={{display:"none"}} accept=".png,.jpg,.jpeg" onChange={(e)=>setsharepic(e.target.files[0])} />
</label>
<div className="options">
<LocalOffer htmlColor="blue" className="shareicons"/><span className="optiontext">Tag</span>
</div>
<div className="options">
<LocationOn  htmlColor="green" className="shareicons"/><span className="optiontext">Location</span>
</div>
<div className="options">
<EmojiEmotions htmlColor="goldenrod" className="shareicons"/><span className="optiontext">Feelings</span>
</div>
</div>
<button type="submit" className="sharebtn btn btn-success" onClick={shareclick}>
  Post
</button>
    </div>
</form>


    </div>
  )
}
