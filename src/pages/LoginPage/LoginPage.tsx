import "./LoginPage.scss";

export const LoginPage = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="title">LOGIN</h1>
        <form className="loginForm">
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <button className="logInButton">Sign in</button>
          <p>You don't have an account? Register</p>
        </form>
      </div>
    </div>
  )
}
