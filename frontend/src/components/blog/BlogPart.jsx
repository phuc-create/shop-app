import React from "react";
import { Link } from "react-router-dom";
import Bl1 from "../../img/bl1.png";
import Bl2 from "../../img/bl2.png";
import Bl3 from "../../img/bl3.png";

function BlogPart() {
    return (
        <div className="blog-p" id="blog">
            <div className="ctrl-bl">
                <h1>what 's news ?</h1> <Link to="/blog"> View more </Link>
            </div>
            <div className="blog-ex">
                <Link to="/" className="bl-bx">
                    <div className="img_bl-wrap">
                        <img className="on-effect" src={Bl1} alt="blog" />
                        <img className="hover-effect" src={Bl1} alt="blog" />
                    </div>
                    <p>
                        Katsuki Bakugou My Hero Academia Katsuki Bakugo: Origin Anime, manga
          </p>
                    <div className="info-bl">
                        <span> Admin </span>&nbsp;|&nbsp; <span> 12 / 05 / 2021 </span>
                    </div>
                </Link>
                <Link to="/" className="bl-bx">
                    <div className="img_bl-wrap">
                        <img className="on-effect" src={Bl2} alt="blog" />
                        <img className="hover-effect" src={Bl2} alt="blog" />
                    </div>
                    <p>
                        Gohan "In order to protect those important to me, I need to get more
                        and more powerful. "
          </p>
                    <div className="info-bl">
                        <span> Admin </span> &nbsp;|&nbsp; <span> 12 / 05 / 2021 </span>
                    </div>
                </Link>
                <Link to="/" className="bl-bx">
                    <div className="img_bl-wrap">
                        <img className="on-effect" src={Bl3} alt="blog" />
                        <img className="hover-effect" src={Bl3} alt="blog" />
                    </div>
                    <p>
                        (masterless samurai) who met Goku while the latter was searching for
                        Tambourine.He spends most of his time with Korin
          </p>
                    <div className="info-bl">
                        <span> Admin </span>&nbsp;|&nbsp; <span> 12 / 05 / 2021 </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default BlogPart;
