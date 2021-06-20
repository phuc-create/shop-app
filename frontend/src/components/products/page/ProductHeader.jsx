import React, { useState } from "react";
import "../Products.css";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Sl1 from "../../../img/productSlider1.png";
import Sl2 from "../../../img/productSlider2.png";
import Sl3 from "../../../img/productSlider3.png";

function Product() {
    const SliderArr = [
        {
            title: "Amine in my heart",
            img: Sl1,
            decription:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quod id deleniti.",
        },
        {
            title: "Most favoutire collections",
            img: Sl2,
            decription:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quod id deleniti.",
        },
        {
            title: "Inspired from Distributors",
            img: Sl3,
            decription:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quod id deleniti.",
        },
    ];
    const [current, setCurrent] = useState(SliderArr[0] || SliderArr[1] ? 2 : 0);
    const [index, setIndex] = useState({
        title: "Amine in my heart",
        img: Sl1,
        decription:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo quod id deleniti.",
    });
    const lengthArr = SliderArr.length;
    const checkDot = (num) => {
        setIndex(SliderArr[num]);
    };
    const checkNext = () => {
        setCurrent(current === lengthArr - 1 ? 0 : current + 1);

        setIndex(SliderArr[current]);
    };
    const checkPrev = () => {
        setCurrent(current === 0 ? lengthArr - 1 : current - 1);

        setIndex(SliderArr[current]);
    };
    return (
        <div className="products">
            <div className="slide-products">
                <div className="card-slider">
                    <div className="crd-l">
                        <h1>{index.title}</h1>
                        <p>{index.decription}</p>
                    </div>
                    <div className="crd-r">
                        <img src={index.img} alt="slider" />
                    </div>
                </div>
                <div className="slider-control">
                    <div className="dots-ctl">
                        <div className="dot" onClick={() => checkDot(0)}></div>
                        <div className="dot" onClick={() => checkDot(1)}></div>
                        <div className="dot" onClick={() => checkDot(2)}></div>
                    </div>
                    <div className="btns-ctl">
                        <GrLinkPrevious className="btn-data" onClick={checkPrev} />
                        <GrLinkNext className="btn-data" onClick={checkNext} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
