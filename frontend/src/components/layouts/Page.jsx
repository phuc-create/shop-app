import React from "react";
import { Link } from "react-router-dom";
import at1 from "../../img/at2.png";
import at2 from "../../img/at8.jpg";
import at3 from "../../img/at3.jpg";
import at4 from "../../img/at9.png";
import at5 from "../../img/at10.png";
import "./Layout.css";
function Page() {

  return (
    <div className="hero">
      <div className="hero-overlay-temp"></div>
      <div className="hero-slider">
        <div className="page-l">
          <h1>
            Banners for
            <br />
            decorations_.
          </h1>
          <p>
            let's your desktop become comfotable and makes <br />
            it more actraction!.
          </p>
          <div className="pl_action">
            <Link to="/">Select Now</Link>
            <span>Come With Art</span>
          </div>
        </div>
        <div className="hero-slider-item">
          <img className="sl__item--img" src={at1} alt="null" />
        </div>
        <div className="hero-slider-item">
          <img className="sl__item--img" src={at2} alt="null" />
        </div>
        <div className="hero-slider-item">
          <img className="sl__item--img" src={at3} alt="null" />
        </div>
        <div className="hero-slider-item">
          <img className="sl__item--img" src={at4} alt="null" />
        </div>
        <div className="hero-slider-item">
          <img className="sl__item--img" src={at5} alt="null" />
        </div>
      </div>
    </div>
  );
}

export default Page;
