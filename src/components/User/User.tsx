import "./User.scss";

export const User = ({ userInfo, onClick, lastMessage}: any) => {

  console.log(userInfo);

  return (
    <div className="user" onClick={onClick}>
      <img className="userImage" src={userInfo.photoUrl} alt="" />
      <div className="userInfo">
        <span className="userName">{userInfo.displayName}</span>
        <p className="userMessage">{lastMessage?.text}</p>  
      </div>
    </div>
  )
}
