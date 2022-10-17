import { Navbar } from "../Navbar/Navbar";
import { User } from "../User/User";
import { useState } from "react";
import "./Sidebar.scss";

export const Sidebar = () => {

  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState(false);
  
  console.log(error);

  return (
    <div className="sidebar">
      <Navbar setUser={setUser} setError={setError}/>
      {error && <span>User not found</span>}
      {user && 
      <div className="searchResult">
        <img className="searchUserImage" src={user.photoURL} alt={user.displayName} />
        <div className="searchUserInfo">
          <span className="searchUserName">{user.displayName}</span>
        </div>
      </div>}
      <User />
    </div>
  )
}
