import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import classes from './signup.module.css'

const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordconformationRef = useRef();
  const navigate = useNavigate();

  const register = async () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value;
    const Password = passwordRef.current.value;
    const passwordconformation = passwordconformationRef.current.value;

    const response = await fetch("http://ferasjobeir.com/api/users/register", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: Password,
        password_confirmation: passwordconformation,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.success) {
      setTimeout(() => {
        navigate("/SignIn");
        window.alert(json.messages);
      }, 1000);
    } else {
      window.alert(json.messages[0]);
    }
  };

  return (
    <>
      <div className={classes.box}>
        <img className={classes.img}src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"/>
        <h1>Create Account</h1>
        <div className={classes.allboxes}>

          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" id="name"/>

          <label htmlFor="Email Address">Email Address</label>
          <input ref={emailRef} type="text" id="name"/>

          <label htmlFor="Password">Password</label>
          <input ref={passwordRef} type="Password" id="name"/>

          <label htmlFor="Password conformation">Password conformation</label>
          <input ref={passwordconformationRef} type="Password" id="name"/>

          <div className={classes.btns}>
            {/* <input className={classes.btn}type="button"value="Login"onClick={() => navigate("/Signin")}/> */}
            <a class href="/Signin" onClick={() => navigate("/Signin")}> Login </a>
            <input className={classes.btn}type="button"value="Register"onClick={register}/>

          </div>
        </div>
      </div>  
    </>
  );
};
export default SignUp;
