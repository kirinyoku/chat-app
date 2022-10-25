import { Input } from "../Input/Input";
import { Messages } from "../Messages/Messages";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./Chat.scss";


export const Chat = () => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  console.log(data.user)

  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="chatUserName">
          {currentUser.uid !== data.user.uid ? data.user.displayName : "Saved Messages"}
        </span>
      </div>  
      <Messages />
      <Input />
    </div>
  )
}
