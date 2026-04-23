import React, { useEffect } from "react";
import "../hero.css"
const Hero = () => {

  useEffect(() => {
    import("../script.js");
  }, []);

  return (
    <>
    <div className="hero">
      <nav>
        <div className="logo">
          <p>Me</p>
        </div>

        <div className="nav-items">
          <p>Work</p>
          <p>Studio</p>
          <p>News</p>
          <p>Contact</p>
        </div>
      </nav>

      <footer>

        <div className="slide-counter">
          <div className="count">
            <p>1</p>
          </div>
        </div>
      </footer>

      <div className="slider">
        <div className="slide">
          <div className="slide-bg-img">
            <img src="/img1.png" alt="" />
          </div>
        </div>

        <div className="slide-main-img">
          <div className="slide-main-img-wrapper">
            <img src="/img1.png" alt="" />
          </div>
        </div>

        <div className="slide-copy">
          <div className="slide-title">
            {/* <h1>Slide heading</h1> */}
          </div>

          <div className="slide-description">
            {/* <p>Conceptualism</p> */}
          </div>
        </div>

        <button className="skip-to-details">↓</button>
      </div>

      <section className="details-section">
        <div className="details-content">
        </div>
      </section>
      </div>
    </>
  );
};

export default Hero;