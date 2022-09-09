import { Chat } from "../../components/Chat/Chat";
import { Sidebar } from "../../components/Sidebar/Sidebar";

import "./HomePage.scss";

export const HomePage = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}
