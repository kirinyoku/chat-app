import { Input } from "../Input/Input";
import { Messages } from "../Messages/Messages";

import "./Chat.scss";

export const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="chatUserName">Kirin</span>
      </div>  
      <Messages />
      <Input />
    </div>
  )
}
