import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react"; 
import { AiOutlineSend } from 'react-icons/ai';
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Attach from "../../img/attach.png";

import "./Input.scss";

export const Input = () => {

  const [ text, setText ] = useState("");
  const [ img, setImg ] = useState<any>(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {

    if (img) {

      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);  
      
      uploadTask.on('state_changed', 
        (error) => {
          console.log(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            });
          });
        }
      );
    } else if (text.length > 0) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp() 
      })
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp() 
      })
    }

    setText("");
    setImg(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (images) {
      setImg(images[0]);
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSend();
  }

  return (
    <div className="input-wrapper">
      <div className="input">
        <label htmlFor="file">
          <img className="attach" src={Attach} alt="" />
        </label>
        <input 
          type="text" 
          placeholder="Write a message..." 
          onChange={(e) => setText(e.target.value)} 
          value={text}
          onKeyDown={handleKey}
          />
      </div>
      <div className="send">
        <input 
          type="file" 
          style={{display: "none"}} 
          id="file" 
          onChange={handleChange}
          accept="image/*"
        />
        <button className="sendButton" onClick={handleSend} onKeyDown={handleSend}>
          <AiOutlineSend />
        </button>
      </div>
    </div>
  )
}
