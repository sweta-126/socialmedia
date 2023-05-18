import React, { useContext, useEffect, useState } from "react";
import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import "./Topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosInst from "../../config";
import { toast } from "react-toastify";

const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [search, setSearch] = useState(null);
  const [frndlist , setFrndlist] = useState();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  console.log(user);

  const handleSearch = (e) =>{
    setSearch(e.target.value);
    e.preventDefault();
  }

  useEffect(()=>{
    const getUser = async () =>{
      try{
        const res = await axiosInst.get(`/users?username=${search}`);
        setFrndlist(res.data);
      }
      catch(e){
        console.log(e);
      }
    };
    getUser();
  }, [search])


  const handleLogout = () =>{
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  }

  return (
    <div className="topbar">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocialMedia</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friends,posts and videos"
            className="search-input"
            onChange={handleSearch}
            onKeyDown={(event)=>{
              if(event.key === "Enter"){
                if(frndlist?.username){
                  navigate(`/profile/${frndlist?.username}`);
                }
                else{
                  toast("Username not found");
                }
              }
            }}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbarLink" >Home</span>
          </Link>
          <span className="topbarLink" onClick={handleLogout}>Log Out</span>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "noAvatar.png"
            }
            alt=""
            className="topbarImage"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
