import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import "./modals.css"
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletepost, updatePost } from '../../auth/editpost';
import { createSelector } from 'reselect';
import { makeSelector } from '../../reducers/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../reducers/actions';
import DoneAllIcon from '@mui/icons-material/DoneAll';
const PFPERSON=process.env.REACT_APP_PUBLIC_URL_PERSON

const stateSelector =createSelector(makeSelector,(user)=>({
  user
}))
export default function FormDialog({edit,post,fun,username,setprofileposts,profileUser}){
const[postupdated,setpostupdated]=React.useState(false)
  const[postdeleted,setpostdeleted]=React.useState(false)
  const {user}=useSelector(stateSelector)
  const[updatepost,setupdatepost]=React.useState(post.desc)
const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fun()
  };
  const deletepostfun=()=>{
    setpostdeleted(false)
    deletepost(post,user,setpostdeleted,dispatch,username,setprofileposts)
  }
  const savePost=()=>{
    setpostupdated(false)
    updatePost(dispatch,user,updatepost,post,setpostupdated,username,setprofileposts)
  }
  return (
    <div>
      <div  onClick={handleClickOpen} className="divmain">
        {edit?<div className="divedit">Edit</div>:<div className="divedit">Delete</div>}
      </div>
      <Dialog className="dialog" open={open} onClose={handleClose}>
        {edit?<><DialogTitle className="dialogtitle">{postupdated?<>Updated <DoneAllIcon/></>:<>Edit Post <EditIcon className="mx-1"/></>}</DialogTitle>
        <DialogContent>
        <form className="sharewrapper mt-2">
    <div className="sharetop">
<img  className="shareimg" src={user.profilepic?`${PFPERSON}/${user.profilepic}`:`${PFPERSON}/nouser.png`} alt=""/>
<textarea placeholder="What's in your mind?" rows='1' name="sharetextedit" readonly={postupdated?"readonly":null} value={updatepost} onChange={(e)=>{setupdatepost(e.target.value)}}/>
    </div>
    </form>
        </DialogContent>
        <DialogActions>
        {postupdated?<Button onClick={handleClose} className="canclebtn text-danger">OK</Button>:<> <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={savePost}>Save</Button></>}
        </DialogActions></>:<><DialogTitle className="dialogtitle">Delete <DeleteIcon className="mx-1"/></DialogTitle>
        <DialogContent>
          <DialogContentText className="deletetext">
            {postdeleted?<><WarningIcon htmlColor="tomato" className="mx-1 warn"/>Post deleted</>:<><WarningIcon htmlColor="tomato" className="mx-1 warn"/>Do you want to delete this post?</>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {postdeleted?null:<><Button onClick={handleClose} className="canclebtn text-danger">Cancle</Button><Button className="deletebtn text-success" onClick={deletepostfun}>Delete</Button></>} 
        </DialogActions></>}
      </Dialog>
    </div>
  );
}
