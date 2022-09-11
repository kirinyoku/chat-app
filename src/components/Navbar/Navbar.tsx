import { Search } from "../Search/Search";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsArrowBarLeft } from "react-icons/bs";

import "./Navbar.scss";

export const Navbar = () => {

  const [slidebar, setSlidebar] = useState(false);

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
          <Search />
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
            <img className='myImage' src="https://pbs.twimg.com/profile_images/1531985396174921729/Fjs8B2Dz_400x400.jpg" alt="avatar" />
            <div className="nickname">Kirin</div>
            <div className="email">123456@gmail.com</div>
          </div>
          <button className="logoutButton">Log out</button>
        </aside>
      </div>
    </>
  )
}
