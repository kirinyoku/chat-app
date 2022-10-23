
import { DocumentData } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import React, { useContext, useEffect, useRef } from "react";

import "./Message.scss";


export const Message = ({ message }: DocumentData) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid ? "owner" : ""}`}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoUrl} alt="" />
      </div>
      <div className="messageContent">
        {message.text.length > 0 && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}
