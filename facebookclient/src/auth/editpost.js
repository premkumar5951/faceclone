import { getPosts } from "./getposts";

export const deletepost=async(post,user,setpostdeleted,dispatch,username,setprofilepost)=>{
    try{
        const res=await fetch(`/posts/${post._id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({userId:user._id})
        })
        const data=await res.json();
        if(res.status==200){
            setpostdeleted(true)
            getPosts(dispatch,user,username,setprofilepost)
            console.log(data)
        }
        
    }catch(e){
        console.log(e)
    }
}


export const updatePost=async(dispatch,user,text,post,setpostupdated,username,setprofilepost)=>{
    try{
  const res=await fetch(`/posts/${post._id}`,{
    method:"PUT",
    headers:{
      "content-type":'application/json'
    },
    body:JSON.stringify({desc:text,userId:user._id})
  })
  const data=await res.json()
  if(res.status==200){
    setpostupdated(true)
    getPosts(dispatch,user,username,setprofilepost)
  }
  console.log(data)
  
}catch(e){
console.log(e)
  }
}