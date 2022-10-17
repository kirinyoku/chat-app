import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

interface ProtectedRouteProps {
  children?: React.ReactNode;
};

export const App = () => {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    return (
      <>
        { !currentUser ? <Navigate to="/login" /> : children }
      </>
    )
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<ProtectedRoute>
              <HomePage />
            </ProtectedRoute>}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="register" element={<RegisterPage />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
