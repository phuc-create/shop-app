import React from "react";

import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Team from "../../img/attachment_bg_about.jpg";
import Board from "../../img/thuyen.jpg";
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaGoogle,
  FaPinterest,
  FaInstagram,
  FaLinkedinIn,
  FaComments,
} from "react-icons/fa";
import "./About.css";

function AboutPage() {
  return (
    <div className="main">
      <Header />
      <div className="about">
        <div className="header-ab">
          <div className="p1-white">
            <button className="title-ab">About us</button>
          </div>
          <div className="p2-img">
            <img src={Team} alt="luffy" />
          </div>
        </div>
        <div className="ab-infor">
          <h1 className="whoweare">Who we are ?</h1>
          <div className="ab__infor-wrapper">
            <div className="ab__infor--content">
              <h1>
                a global store selling anime poster,banner and anime art wall
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ipsamsum dolor sit amet consectetur adipisicing elit. Ipsam pum
                dolor sit amet consectetur adipisicing elit. Ipsam pum dolor sit
                amet consectetur adipisicing elit. Ipsam possimus delectus
                nostrum amet voluptate aut culpa ullam cum est? Labore sint,
                debitis magnam adipisci sequi rerum. Rem consectetur alias iure.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ipsamsum dolor sit amet consectetur adipisicing elit. Ipsam pum
                dolor sit amet consectetur adipisicing elit. Ipsam pum dolor sit
                amet consectetur adipisicing elit. Ipsam possimus delectus
                nostrum amet voluptate aut culpa ullam cum est? Labore sint,
                debitis magnam adipisci sequi rerum. Rem consectetur alias iure.
              </p>
            </div>
            <div className="ab__infor--social">
              <button>become distributor</button>
              <span>get in touch with us</span>
              <div className="__social">
                <div className="icon">
                  <FaFacebookF />
                </div>
                <div className="icon">
                  <FaGoogle />
                </div>
                <div className="icon">
                  <FaPinterest />
                </div>
                <div className="icon">
                  <FaInstagram />
                </div>
                <div className="icon">
                  <FaLinkedinIn />
                </div>
                <div className="icon">
                  <FaComments />
                </div>
                <div className="icon">
                  <FaTwitter />
                </div>
                <div className="icon">
                  <FaYoutube />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tempo">
          <div className="intro">
            <div className="sign-txt">
              <h1>name</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Cupiditate, rerum necessitatibus est perferendis, voluptate enim
                corporis velit tenetur magnam ea hic modi asperiores maxime vel
                dolore itaque debitis obcaecati. Autem!Lorem
              </p>
              <span>Nguyen Huu Phuc</span>
            </div>
            <img src={Board} alt="" />
          </div>
        </div>
        <div className="ft-about">hope you enjoy it!</div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
