import { Input } from "../Input/Input";
import { Messages } from "../Messages/Messages";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";

import "./Chat.scss";

export const Chat = () => {

  const { data } = useContext(ChatContext);

  console.log(data.user)

  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="chatUserName">{data.user.displayName}</span>
      </div>  
      <Messages />
      <Input />
    </div>
  )
}
