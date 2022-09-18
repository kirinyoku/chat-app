import Attach from "../../img/attach.png"
import { AiOutlineSend } from 'react-icons/ai';

import "./Input.scss";

export const Input = () => {
  return (
    <div className="input-wrapper">
      <div className="input">
        <label htmlFor="file">
          <img className="attach" src={Attach} alt="" />
        </label>
        <input type="text" placeholder="Write a message..."/>
      </div>
      <div className="send">
        <input type="file" style={{display: "none"}} id="file"/>
        <button className="sendButton">
          <AiOutlineSend />
        </button>
      </div>
    </div>
  )
}
