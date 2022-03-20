import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './drop.css'
import { logout } from '../../auth/auth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser,SetAuth } from '../../reducers/actions';



const actionDispatch=(dispatch)=>({
  setUser:(user)=>dispatch(setUser(user))
})
export default function FadeMenu() {
  const { setUser}= actionDispatch(useDispatch())
  const history=useNavigate()
  const dispatch=useDispatch()
  const logouthandler=()=>{
    logout(dispatch,setUser,SetAuth,history)
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div className="my-auto">
      <p className="pdrop"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ArrowDropDownIcon className="drop"/>
      </p>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Setting</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose,logouthandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
