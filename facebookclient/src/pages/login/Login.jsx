import{React,useEffect,useState } from 'react'
import Bottombar from '../../components/bottombar/Bottombar'
import Topbar from '../../components/topbar/Topbar'
import "./login.css"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import { SetAuth, setUser,fetchFailedbtn, fetchStartedbtn, fetchSuccessfulbtn } from '../../reducers/actions'
import CircularProgress from '@mui/material/CircularProgress';
import auth from '../../auth/auth'
import Loading from '../../components/loading/Loading'


export default function Login() {
  const history=useNavigate()
const [logindata,setlogindata]=useState({
  email:"",
  password:""
});
const Authenticate=useSelector((state)=>state.userAuth)
const {isfetching,error,fetched}=useSelector((state)=>state.fetched)
const {btnfetching,btnerror,btnfetched}=useSelector((state)=>state.fetchedbtn)
const dispatch=useDispatch()
useEffect(()=>{
  auth(dispatch,SetAuth,setUser,history)
  },[])
 if(Authenticate){
    history('/')
  }
const onchangehandler=(e)=>{
const name=e.target.name
const value=e.target.value
setlogindata({...logindata,[name]:value})
}
const clickhandler=async(e)=>{
e.preventDefault()
const {email,password}=logindata
dispatch(fetchStartedbtn())
try{
  const res=await fetch('/users/auth/login',{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({email,password})
})
const data= await res.json()
if(res.status==200){
  SetAuth(true)
  setUser(data)
  dispatch(fetchSuccessfulbtn())
  history('/')
}
else{
  dispatch(fetchFailedbtn(data))
  
}
}catch(e){
dispatch(fetchFailedbtn())
console.log(e)
console.log("error")
}
}

return (<>
{isfetching?<Loading/>:<><Topbar/>
<div className="login">
    <div className="loginwrapper">
        <div className="leftlogin">
<div className="leftcontent">
    <h1><strong>FaceClone</strong></h1>
    <h5>Connect with friends and world around you on FaceClone.</h5>
</div>
        </div>
        <div className="rightlogin">
            <form action="">
            <div className="loginform">
                <input type="email" placeholder="email" name="email" value={logindata.email} onChange={onchangehandler}/>
                <input type="password" placeholder="password" name="password" value={logindata.password} onChange={onchangehandler}/>
                <button type="submit" className="logbtn bg-primary cbtn px-3 my-2" onClick={clickhandler}>{btnfetching?<CircularProgress  size={17} style={{"color":"white"}}/>:"login"} </button>
                <p>Forgot password?</p>
                <NavLink to="/register"><button className="createbtn bg-success cbtn px-3 my-2">{btnfetching?<CircularProgress  size={17} style={{"color":"white"}}/>:"Create an account"}</button></NavLink>
                </div>
                </form>  
        </div>
    </div>
</div>
<Bottombar/></>}

  </>
   
  )
}
