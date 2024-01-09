import React from 'react';
import "../styles/Footer.css";
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Logo from "../Assests/logo.jpg";




const Footer = () => {
  return (
    <footer class="footer">
              <div class="footer-content-container">
                <div class="">
                  <img src={Logo} alt="Logo" class=" footer-logo"></img>
                </div>
             <div class=" footercontainer">
                  <p >Home</p>
                  <p>|</p>
                  <p>Property</p>
                </div>
        
                <div class=" socialcontainer">
                    <FaFacebookSquare/>
                  <RiInstagramFill/>
                </div>
              </div>
          </footer>
  )
}

export default Footer
