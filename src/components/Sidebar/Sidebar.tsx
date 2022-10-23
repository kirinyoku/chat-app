import { Navbar } from "../Navbar/Navbar";
import { useContext, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import Chats from "../Chats/Chats";

import "./Sidebar.scss";
import { ChatContext } from "../../context/ChatContext";

export const Sidebar = () => {

  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState(false);

  const { dispatch } = useContext(ChatContext); 
  const { currentUser } = useContext(AuthContext)

  const handleSelect = async (u: any) => {
    // check whether the chat firebase exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));
      // create a chat in chats collection
      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedId), {messages: []});
      }
      // create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId+".userInfo"]:{
          uid: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL
        },
        [combinedId+".date"]: serverTimestamp()
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId+".userInfo"]:{
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoURL
        },
        [combinedId+".date"]: serverTimestamp()
      });
      dispatch({ type: "CHANGE_USER", payload: u });
    } catch (err) {
      setError(true);
      console.log(err)
    }
    setUser(null);
  };

  return (
    <div className="sidebar">
      <Navbar setUser={setUser} setError={setError}/>
      {error && <span>User not found</span>}
      {user && 
      <div className="searchResult" onClick={() => handleSelect(user)}>
        <img className="searchUserImage" src={user.photoURL} alt={user.displayName} />
        <div className="searchUserInfo">
          <span className="searchUserName">{user.displayName}</span>
        </div>
      </div>}
      <Chats />
    </div>
  )
}
