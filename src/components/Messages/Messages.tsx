import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import { Message } from "../Message/Message";

import "./Messages.scss";

export const Messages = () => {

  const [ messages, setMessages ] = useState<DocumentData>([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unSub();
    }
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((m: DocumentData)=> (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}
