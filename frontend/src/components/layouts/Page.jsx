import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import at1 from "../../img/at2.png";
import at2 from "../../img/at5.jpg";
import at3 from "../../img/at7.jpg";
import at4 from "../../img/at9.png";
import at5 from "../../img/at10.png";
import "./Layout.css";
function Page() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    window.interval = setInterval(() => {
      setShow(!show);
    }, 1000);
    return () => {
      clearInterval(window.interval);
    };
  });
  const style = (check) => (check ? { zIndex: "-10" } : { zIndex: "1" });

  return (
    // <section className="page">
    //   <div className="page-l">
    //     <h1>
    //       Banners for
    //       <br />
    //       decorations_.
    //     </h1>
    //     <p>
    //       let's your desktop become comfotable and makes <br />
    //       it more actraction!.
    //     </p>
    //     <div className="pl_action">
    //       <Link to="/">Select Now</Link>
    //       <span>Come With Art</span>
    //     </div>
    //   </div>
    //   <div className="page-r">
    //     <img src={MainImg} alt="main" />
    //     <img style={style(show)} src={MainImg2} alt="main" />
    //   </div>
    // </section>
    <div className="hero">
      <div className="hero-overlay-temp"></div>
      <div className="hero-slider">
        <div className="hero-slider-item">
          <img className="sl__item--img" src={at1} alt="null" />

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
        </div>
        <div className="hero-slider-item">
          <img className="sl__item--img" src={at2} alt="null" />
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
        </div>
        <div className="hero-slider-item">
          <img className="sl__item--img" src={at3} alt="null" />

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
        </div>
        <div className="hero-slider-item">
          <img className="sl__item--img" src={at4} alt="null" />

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
        </div>
        <div className="hero-slider-item">
          <img className="sl__item--img" src={at5} alt="null" />

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
        </div>
      </div>
    </div>
  );
}

export default Page;
