import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
 
import "./LoginPage.scss";

export const LoginPage = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch(err) {
      setErr(true);
      console.log(err);
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="title">LOGIN</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <button className="logInButton">Sign in</button>
          <p>You don't have an account? <Link to="/register" style={{color: 'black'}}>Register</Link></p>
        </form>
      </div>
    </div>
  )
}
