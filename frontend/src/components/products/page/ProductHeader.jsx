import React from "react";
import "../Products.css";
import Sl1 from "../../../img/pd1.jpg";
import Sl2 from "../../../img/pd2.jpg";
import Sl3 from "../../../img/pd3.jpg";

function Product() {
    return (
        <div className="products">
            <div className="slide-products">
                <div className="card-slider">
                    <div className="crd-l">
                        <h1>Most favoutire collections</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br /> Illo quod id deleniti.</p>
                    </div>
                    <div className="crd-r">
                        <img src={Sl1} alt="slider" />
                    </div>
                </div>
                <div className="card-slider">
                    <div className="crd-l">
                        <h1>Amine in my heart</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br /> Illo quod id deleniti.</p>
                    </div>
                    <div className="crd-r">
                        <img src={Sl2} alt="slider" />
                    </div>
                </div>
                <div className="card-slider">
                    <div className="crd-l">
                        <h1>Inspired from Distributors</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br /> Illo quod id deleniti.</p>
                    </div>
                    <div className="crd-r">
                        <img src={Sl3} alt="slider" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
