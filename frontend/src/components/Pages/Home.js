import React from "react";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import About from "../About/About";
import Contact from "../Contact/Contact";
import "./Home.css";  // Let's create some styles for our home page

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Guest Room Booking Application</h1>
          <p>Your comfort is our priority.</p>
          <div className="hero-buttons">
            <a href="#about" className="btn">About Us</a>
            <a href="#contact" className="btn">Contact Us</a>
            <a href="/login" className="btn">Login</a>
            <a href="/register" className="btn">Register</a>
          </div>
        </div>
      </div>
      {/* Sections for About and Contact */}
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default Home;
