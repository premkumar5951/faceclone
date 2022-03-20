import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Bottombar from "../../components/bottombar/Bottombar";
import { SetAuth, setUser,fetchFailedbtn, fetchStartedbtn, fetchSuccessfulbtn } from '../../reducers/actions'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';
import authnoredirect from "../../auth/auth";
import { NavLink } from "react-router-dom";
import Loading from "../../components/loading/Loading";


export default function Register() {

  const history=useNavigate()
  const [registerdata,setregisterdata]=useState({
    username:"",
    email:"",
    password:"",
    confirmpass:""
  });
const Authenticate=useSelector((state)=>state.userAuth)
const {isfetching,error,fetched}=useSelector((state)=>state.fetched)
const {btnfetching,btnerror,btnfetched}=useSelector((state)=>state.fetchedbtn)

  const dispatch=useDispatch()
  
  const handleregister=(e)=>{
  const name=e.target.name
  const value=e.target.value
  setregisterdata({...registerdata,[name]:value})
  }
  const clickregister=async(e)=>{
  e.preventDefault()
  const {username,email,password}=registerdata
  dispatch(fetchStartedbtn())
  try{
    const res=await fetch('/users/auth/register',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({username,email,password})
  })
  const data= await res.json()
  if(res.status==200){
    dispatch(fetchSuccessfulbtn())
    history('/')
  }
  else{
    dispatch(fetchFailedbtn(data))
  }
  }catch(e){
  dispatch(fetchFailedbtn())
  }
  }
  useEffect(()=>{
    authnoredirect(dispatch,SetAuth,setUser)
    },[])
   if(Authenticate){
      history('/')
    }
  return (
    <>
    {isfetching?<Loading/>:<><Topbar />
      <div className='login'>
        <div className='loginwrapper'>
          <div className='leftlogin'>
            <div className='leftcontent'>
              <h1>
                <strong>FaceClone</strong>
              </h1>
              <h5>Connect with friends and world around you on FaceClone.</h5>
            </div>
          </div>
          <div className='rightlogin'>
            <form action=''>
              <div className='loginform'>
                <input type='text' placeholder='username'  name="username" onChange={handleregister} value={registerdata.username}/>
                <input type='email' placeholder='email' name="email" onChange={handleregister} value={registerdata.email}/>
                <input type='password' placeholder='password' name="password" onChange={handleregister} value={registerdata.password}/>
                <input type='password' placeholder=' Confirm password' name="confirmpass" onChange={handleregister} value={registerdata.confirmpass} />
                <button type="submit" className="logbtn bg-primary cbtn px-3 my-2" onClick={clickregister}>{btnfetching?<CircularProgress  size={17} style={{"color":"white"}}/>:"SignUp"}</button>
                <NavLink to="/login"><div><button className="createbtn bg-success cbtn px-3 my-2">{btnfetching?<CircularProgress  size={17} style={{"color":"white"}}/>:"Already have an account"}</button></div></NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Bottombar /></>}
      
    </>
  );
}
