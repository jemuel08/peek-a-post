import React,{useState} from "react";
import { auth } from "../utils/firebase";
import { Button } from "@material-ui/core";
import "../styles/Nav.css";

export default function Nav() {
  const [navbar,setNavbar] = useState(false)

  const changeBackground = () => {
    if(window.scrollY>=20){
      setNavbar(true)
    }else{
      setNavbar(false)
    }

  }
  window.addEventListener('scroll',changeBackground);
  return (
    
      <div className={navbar ? 'homeHeader active' :'homeHeader'}>
        <div className="logoContainer">
          <div className="logo1Container">
            <img
              className="logoImage"
              src="../images/logo.png"
              alt="LOGO HERE"
            />
          </div>
          <div className="logo2Container">
            <h2 className="logoText">Peek a Post</h2>
          </div>
        </div>
        <div className="logoutButton">
          <Button onClick={() => auth.signOut()} className="logout-button">Logout</Button>
        </div>
      </div>
  
  );
}
