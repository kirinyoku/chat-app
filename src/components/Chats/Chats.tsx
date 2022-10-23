import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { User } from "../User/User";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import "./Chats.scss";

const Chats = () => {
  const [ chats, setChats ] = useState<any>([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u: any) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a:any, b:any)=>b[1].date - a[1].date).map((chat: any) => (
        <User 
          userInfo={chat[1].userInfo}
          lastMessage={chat[1].lastMessage} 
          key={chat[0]} 
          onClick={() => handleSelect(chat[1].userInfo)}
        />
      ))}
    </div>
  );
};

export default Chats;