import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react"; 
import { AiOutlineSend } from 'react-icons/ai';
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";

import Attach from "../../img/attach.png";

import "./Input.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


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
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // setErr(true);
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
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      });
    }

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

    setText("");
    setImg(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (images) {
      setImg(images[0]);
    }
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
          />
      </div>
      <div className="send">
        <input 
          type="file" 
          style={{display: "none"}} 
          id="file" 
          onChange={handleChange}
        />
        <button className="sendButton" onClick={handleSend}>
          <AiOutlineSend />
        </button>
      </div>
    </div>
  )
}
