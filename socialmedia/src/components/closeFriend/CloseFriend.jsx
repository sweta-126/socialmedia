import React from 'react';
import "./CloseFriend.css";

const CloseFriend = ({user}) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <li className="sidebarFrnd">
        <img src={PF+user.profilePicture} alt="" className="sidebarFrndImg" />
        <span className="sidebarFrndName">{user.username}</span>
    </li>
  )
}

export default CloseFriend