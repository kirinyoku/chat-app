import "./RegisterPage.scss";

export const RegisterPage = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="title">REGISTER</h1>
        <form className="registerForm">
          <input type="text" placeholder="display name"/>
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <input style={{display: "none"}} type="file" id="file" />
          <div className="fileInput">
            <label htmlFor="file">
              <div className="fileButton">Choose file</div>  
            </label>
          <span>Add to avatar</span>
          </div>
          <button className="signUpButton">Sign up</button>
          <p>You do have an account? Login</p>
        </form>
      </div>
    </div>
  )
}
