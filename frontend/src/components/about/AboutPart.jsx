import React from 'react'
import "./About.css"
import { BiStar } from "react-icons/bi"
import AboutImg from "../../img/about.png"
import { Link } from "react-router-dom"
function AboutPart() {
    return (
        <div className="about-p" id="about">
            <div className="ab-l">
                <p className="ab-header"><BiStar className="ab-h-rel" /> Our services.</p>
                <h1>Provided more than 200+ beauty<br /> poster, brand and banner <span className="hl-word">Anime</span><br /> colections.</h1>
                <p className="ab-bot">My boss is a person who likes whatching<br />  and colect anime card and also  special Anime pictures...</p>
                <Link to="/about" className="ab-more">More</Link>
                <p className="ab_line-on">Let's discuss about your colections.</p>
            </div>
            <div className="ab-r">
                <img src={AboutImg} alt="about us" />
                <div className="abs-bot">
                    <span>__200+ colections</span>
                    <span>__50+ categories</span>
                    <span>__100+ contributor</span>
                </div>
            </div>
        </div>
    )
}

export default AboutPart
