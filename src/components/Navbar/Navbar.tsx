import { Search } from "../Search/Search";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsArrowBarLeft } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./Navbar.scss";

export const Navbar = (props: any) => {

  const [slidebar, setSlidebar] = useState(false);
  const { currentUser }: any = useContext(AuthContext);

  const toggleSlidebar = () => {
    if (!slidebar) {
      setSlidebar(true);
    } else {
      setSlidebar(false);
    }
  }
  
  return (
    <>
      <div className="navbar">
        <div className="showSlidebar">
          <GiHamburgerMenu 
            onClick={toggleSlidebar} 
            size="30px" 
            style={{cursor: "pointer"}}
            className="hamburgerIcon"
          />  
        </div>
        <div className="search">
          <Search setUser={props.setUser} setError={props.setError}/>
        </div>
      </div>
      <div className={slidebar ? "slidebar" : "slidebar hidden"}>
        <div className="hideSlidebar">
          <BsArrowBarLeft 
            onClick={toggleSlidebar} 
            size="30px" 
            style={{cursor: "pointer"}}
            className="arrowIcon"   
          />
        </div>
        <aside>
          <div className="userInfo">
            <img className='myImage' src={currentUser.photoURL} alt="avatar" />
            <div className="nickname">{currentUser.displayName}</div>
            <div className="email">{currentUser.email}</div>
          </div>
          <button className="logoutButton" onClick={() => signOut(auth)}>Log out</button>
        </aside>
      </div>
    </>
  )
}
