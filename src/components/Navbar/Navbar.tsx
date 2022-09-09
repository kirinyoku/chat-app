import { Search } from "../Search/Search";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="burgerMenu">
        Burger
      </div>
      <div className="search">
        <Search />
      </div>
    </div>
  )
}
