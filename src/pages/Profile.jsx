import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserThunk } from '../store/slices/authSlice';

const UserProfile = () => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const user = useSelector((state) => state.authSlice.user);
    const [userEditedData, setUserEditedData] = useState({
        fullName: user.fullName,
        password: ""
    })
    
    const handelUpdate = ()=>{
        dispatch(updateUserThunk(userEditedData))
    }
  return (
    <>
     <Link to="/chat">Back</Link>
        <div className="profile-container">
        <div className="profile-card">
            <button onClick={()=>setEditMode(!editMode)} className='editbtn'>Edit</button>
            <img
            src={user?.avatar}
            alt="Profile"
            className="profile-avatar"
            />
            <input onChange={(e)=>setUserEditedData((prv)=>({...prv, fullName: e.target.value}))} type='text' value={editMode? userEditedData.fullName :user.fullName} className="profile-name"/>
            <input type='text' value={user.email} className="profile-email"/>
            {
                editMode && <input onChange={(e)=>setUserEditedData((prv)=>({...prv, password: e.target.value}))} type='password' placeholder='New Password' className="profile-email"/>
            }


            {
                editMode && <div className='profile-btm-btn'>
                    <button onClick={handelUpdate} className='savebtn'>Save</button>
                    <button onClick={()=> setEditMode(false)} className='cancelbtn'>Cancel</button>
                </div>
            }
        </div>
        </div>
    </>
  );
};

export default UserProfile;