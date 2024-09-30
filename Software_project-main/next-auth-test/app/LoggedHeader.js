import React, { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import "./style.css";
import { useRouter } from 'next/navigation';

function LoggedHeader() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const router = useRouter();

  const handleNavToggle = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleHomeClick = () => {
    router.push('/');  
  };

  return (
    <header>
      <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
        <img src="logo.png" style={{width:"50px"}} alt="Logo"></img>
        <h2 className="logo">PaintRouteX</h2>
      </div>
      <div className="mobile-nav-icon" onClick={handleNavToggle}>
        ☰
      </div>
      <nav className={`navigation ${isNavVisible ? "visible" : ""}`}>
        <a href="#" onClick={handleHomeClick}>Home</a>
        <a href="#">Features</a>
        <a href="#">Products</a>
        <a href="#" style={{marginRight:"30px"}}>Support</a>
        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
      </nav>
    </header>
  );
}

export default LoggedHeader;