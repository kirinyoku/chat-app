import "./Message.scss";

export const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
        <img src="https://pbs.twimg.com/profile_images/1531985396174921729/Fjs8B2Dz_400x400.jpg" alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, praesentium! A nostrum voluptates perferendis impedit voluptatem quod facere quidem ducimus asperiores, quam eaque tempore veniam earum libero illum, laboriosam dolorem?
        </p>
        {/* <img src="https://pbs.twimg.com/profile_images/1531985396174921729/Fjs8B2Dz_400x400.jpg" alt="" /> */}
      </div>
    </div>
  )
}
