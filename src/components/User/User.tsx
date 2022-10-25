import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./User.scss";

export const User = ({ userInfo, onClick, lastMessage}: any) => {

  const { currentUser } = useContext(AuthContext);
  const savedMessageIcon = "https://cdn.iconscout.com/icon/premium/png-256-thumb/saved-messages-6375218-5264909.png"

  return (
    <div className="user" onClick={onClick}>
      <img className="userImage" src={currentUser.uid !== userInfo.uid ? userInfo.photoUrl : savedMessageIcon} alt="" />
      <div className="userInfo">
        <span className="userName">{currentUser.uid !== userInfo.uid ? userInfo.displayName : "Saved Messages"}</span>
        <p className="userMessage">{lastMessage?.text}</p>  
      </div>
    </div>
  )
}
