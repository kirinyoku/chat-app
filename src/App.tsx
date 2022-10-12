import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

export const App = () => {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="register" element={<RegisterPage />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
