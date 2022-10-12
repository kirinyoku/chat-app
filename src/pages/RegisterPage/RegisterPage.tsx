import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../../firebase";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

import "./RegisterPage.scss"; 

export const RegisterPage = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
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
          setErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid, 
              displayName,
              email, 
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate('/');
          });
        }
      );
    } catch(err) {
      setErr(true);
      console.log(err);
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="title">REGISTER</h1>
        <form className="registerForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="display name"/>
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <input style={{display: "none"}} type="file" id="file" />
          <div className="fileInput">
            <label htmlFor="file">
              <div className="fileButton">Choose file</div>  
            </label>
          <span>Add to avatar</span>
          </div>
          <button className="signUpButton">Sign up</button>
          {err && <span>Something went wrong</span>}
          <p>You do have an account? Login</p>
        </form>
      </div>
    </div>
  )
}
