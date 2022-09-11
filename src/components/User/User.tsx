import "./User.scss"

export const User = () => {
  return (
    <div className="user">
      <img className="userImage" src="https://pbs.twimg.com/profile_images/1531985396174921729/Fjs8B2Dz_400x400.jpg" alt="" />
      <div className="userInfo">
        <span className="userChatName">Kirin</span>
        <p>Hello World</p>
      </div>
    </div>
  )
}
