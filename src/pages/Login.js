import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import { auth } from "../utils/firebase";
import Signup from "./Signup";
import "../styles/Login-signup.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Login() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [modalSignIn, setModalSignIn] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    setModalSignIn(true);
  };

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();

    if (!payload.email || !payload.password) {
      alert("Fields are empty");
    } else {
      auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch((error) => alert(error.message));
      console.log("signed in ");
      setModalSignIn(false);

      alert("You have successfully logged in");
    }
    //backend part
  };

  return (
    <div>
      <div className="login-body">
        <div className="wrap">
          <div className="logo-position">
            <img
              src="../images/logo.png"
              alt="LOGO HERE"
              className="logo-image"
            />
          </div>
          <Button className="signin-button" onClick={signIn}>
            Sign In Now!
          </Button>
          {/* Modal for Sign In */}
          <Modal open={modalSignIn} onClose={() => setModalSignIn(false)}>
            <div style={modalStyle} className={classes.paper}>
              <form className="loginModal">
                <h2>Login to your account</h2>
                <input
                  type="text"
                  value={payload.email}
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange("email")}
                />
                <input
                  type="password"
                  value={payload.password}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange("password")}
                />
                <button onClick={login} className="btn-login">
                  Sign in
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>

      <Signup />
    </div>
  );
}

export default Login;
