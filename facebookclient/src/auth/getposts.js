import { setPosts } from "../reducers/actions"

export const getPosts=async(dispatch,user,username,setprofileposts)=>{
    
  if (username){
    try{
    const res=
    await  fetch(`/posts/profile/${username}`,{
      headers:{
        Accept:"application/json",
        "Content-type":"application/json",
      },
        })
        const data=await res.json()
        if(res.status==200){
          const ordered=data.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
          dispatch(setprofileposts(ordered))
        }else{
          dispatch(setprofileposts([]))
          
        }
  }catch(e){
    console.log(e)
  }}else{
    try{
    const res=
    await  fetch(`/posts/timeline/${user._id}`,{
      headers:{
        Accept:"application/json",
        "Content-type":"application/json",
      },
        })
        const data=await res.json()
        if(res.status==200){
          const ordered=data.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
          dispatch(setPosts(ordered))
        }else{
          dispatch(setPosts([]))
        }
  }catch(e){
    console.log(e)
  }}
  }





