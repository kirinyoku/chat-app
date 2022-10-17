import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import "./Search.scss";

export const Search = (props: any) => {

  const [username, setUsername] = useState("");

  const hadnleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        props.setUser(doc.data())
      });
    } catch (err) {
      props.setError(true);
    }
  };
  
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && hadnleSearch();
  };

  return (
    <div>
      <div className="search">
        <div className="serachForm">
          <input type="text" placeholder="Search" autoFocus onKeyDown={handleKey}  onChange={(e) => setUsername(e.target.value)}/>
        </div>
      </div>
    </div>
  )
}

