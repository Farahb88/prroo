import { useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import classes from "./signin.module.css";
import { AuthContext } from "../../context/AuthContext";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const login = async () => {
    const email = emailRef.current.value;
    const Password = passwordRef.current.value;

    const response = await fetch("http://ferasjobeir.com/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: Password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.success) {
      authCtx.signIn(json);
      setTimeout(() => {
        navigate("/");
        window.alert(json.messages);
      });
    } else {
      window.alert(json.messages[0]);
    }
  };
  const signupNavigate = () => {
    navigate("/signUp");
  };

  return (
    <div className={classes.box}>
      <img
        className={classes.img}
        src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"
      />
      <h1>Login</h1>
      <div className={classes.allboxes}>
        <label htmlFor="Email Address">Email Address</label>
        <input ref={emailRef} type="text" id="name" />

        <label htmlFor="Password">Password</label>
        <input ref={passwordRef} type="Password" id="name" />

        <div className={classes.btns}>
          <div>
            <a class href="/signUp" onClick={signupNavigate}> Register </a>
          </div>
          <input className={classes.btn}type="button"value="Login"onClick={login}/>

          {/* <input className={classes.btn}type="button" onClick={signupNavigate} value="Register"/> */}
        </div>
      </div>
    </div>
  );
};
export default SignIn;
