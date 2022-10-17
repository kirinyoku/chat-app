import { Message } from "../Message/Message";

import "./Messages.scss";

export const Messages = () => {
  return (
    <div className="messages">
      <Message />
      <Message type="owner"/>
      <Message type="owner"/>
      <Message />
    </div>
  )
}
