import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OnePiece from "../../img/one-pie.png";
import AttackOnTitan from "../../img/AoT.png";
import SwordAtOnline from "../../img/sao.png";
import DragonBall from "../../img/dragon-ball.png";
import Kimetsu from "../../img/kimetsu-cate.png";
function Categories() {
  const responsive = {
    0: { items: 1 },
    440: { items: 2 },

    800: { items: 3 },
    1235: { items: 4 },
    1600: { items: 5 },
  };
  return (
    <section className="category" id="categories">
      <h1>Most Popular Categories</h1>
      <OwlCarousel
        items={3}
        responsive={responsive}
        margin={20}
        loop={true}
        className="c_wrap"
      >
        <div className="item box-c">
          <img src={OnePiece} alt="onepice" />
          <h1>
            one piece <br />
            colections
          </h1>
          <a className="view-cate" href="/">
            View
          </a>
        </div>
        <div className="item box-c">
          <img src={Kimetsu} alt="onepice" />
          <h1>
            kimetsu <br />
            colections
          </h1>
          <a className="view-cate" href="/">
            View
          </a>
        </div>
        <div className="item box-c">
          <img src={DragonBall} alt="onepice" />
          <h1>
            dragon ball <br />
            colections
          </h1>
          <a className="view-cate" href="/">
            View
          </a>
        </div>
        <div className="item box-c">
          <img src={AttackOnTitan} alt="onepice" />
          <h1>
            attack on titan <br />
            colections
          </h1>
          <a className="view-cate" href="/">
            View
          </a>
        </div>
        <div className="item box-c">
          <img src={SwordAtOnline} alt="onepice" />
          <h1>
            sword at online
            <br />
            colections
          </h1>
          <a className="view-cate" href="/">
            View
          </a>
        </div>
      </OwlCarousel>
    </section>
  );
}

export default Categories;
