import React from "react";
import { RiFacebookFill, RiTwitterFill, RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Layout.css";

function Footer() {
    return (
        <div className="footer" id="footer">
            <div className="footer__top">
                <div className="footer__top--block">
                    <h1>Address</h1>
                    <Link to="/">
                        52,Hamlet 5,Khue Ngoc Dien Village, Krong Bong District,Dak Lak
          </Link>
                    <span>(+84) 37 599 0006</span>
                    <a href="mailto:phuc82908@gmail.com">Phuc82908@gmail.com</a>
                    <a href="https://apple.com">Bshopweb.com</a>
                    <div className="footer__top--icons">
                        <a
                            href="https://www.facebook.com/NHP1492/"
                            className="footer__icon"
                        >
                            <RiFacebookFill />
                        </a>
                        <a href="/" className="footer__icon">
                            <RiTwitterFill />
                        </a>
                        <a
                            href="https://www.instagram.com/nhp140920/"
                            className="footer__icon"
                        >
                            <RiInstagramFill />
                        </a>
                    </div>
                </div>
                <div className="footer__top--block">
                    <h1>information</h1>
                    <a href="/">Block</a>
                    <a href="/">About Us</a>
                    <a href="/">Contact Us</a>
                    <a href="/">Who We Are</a>
                </div>
                <div className="footer__top--block">
                    <h1>services</h1>
                    <a href="/">Returns & Exchanges</a>
                    <a href="/">Shipping Info</a>
                    <a href="/">International Order</a>
                    <a href="/">FAQs</a>
                </div>
                <div className="footer__top--block">
                    <h1>newsletter</h1>
                    <p>
                        If you don’t want to miss any news from us, please fill to register
                        into our newsletter system.
          </p>
                    <form>
                        <input type="email" placeholder="Your Email..." />
                    </form>
                </div>
            </div>
            <div className="footer__line"></div>
            <div className="footer__bot">
                <div className="footer__bot--block">
                    © 2021 Bshop,Project Only Service Studies.
        </div>
                <div className="footer__bot--block">
                    <a href="/">terms of use</a>
                    <a href="/">privacy policy</a>
                    <a href="/">privacy policy</a>
                    <a href="/">privacy policy</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
