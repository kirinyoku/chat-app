import { Navbar } from "../Navbar/Navbar";
import { User } from "../User/User";
import "./Sidebar.scss";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <User />
      <User />
      <User />
      <User />
      <User />
    </div>
  )
}
