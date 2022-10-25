
import { DocumentData } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useContext, useEffect, useRef } from "react";

import "./Message.scss";


export const Message = ({ message }: DocumentData) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])

  const theDate = new Date(message.date.seconds * 1000);
  const dateString = theDate.toLocaleString();

  return (
    <>
      {<div ref={ref} className={`message ${message.senderId === currentUser.uid ? "owner" : ""}`}>
        <div className="messageInfo">
          <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoUrl} alt="" />
        </div>
        <div className="messageContent">
          {message.senderId !== currentUser.uid ? <p className="messageUsername">
            {data.user.displayName}
          </p> : <p className="messageUsername owner">
            {"Me"}
          </p>}
          {message.img && 
          <div>
            <img className="messageImage" src={message.img} alt="" />  
          </div>}
          {message.text && <p className="messageText">{message.text}</p>}
          <p className="messageDate">{dateString}</p>
        </div>
      </div>}
    </>
  )
}
