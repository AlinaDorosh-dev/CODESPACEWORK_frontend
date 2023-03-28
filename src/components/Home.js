/**
 * @fileoverview This is a Home component
 * @author Alina Dorosh
 */

import classes from "../styles/Home.module.css";
import img1 from "../assets/img/banner-img-1.png";
import img2 from "../assets/img/banner-img-2.png";
import img3 from "../assets/img/banner-img-3.png";
import avatars from "../assets/img/img-people.png";
import Typewriter from "typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";


const Home = () => {
  
  //states for animation
  const [apearNotification, setApearNotification] = useState("");
  const [apearCandidates, setApearCandidates] = useState("");
  const [apearInfoBox1, setApearInfoBox1] = useState("");
  const [apearInfoBox2, setApearInfoBox2] = useState("");
  const [apearInfoBox3, setApearInfoBox3] = useState("");

  //animations timeouts
  setTimeout(() => {
    setApearInfoBox1("fadeInLeft");
  }, 1800);
  setTimeout(() => {
    setApearInfoBox2("apear");
  }, 2800);
  setTimeout(() => {
    setApearInfoBox3("apear");
  }, 3800);
  setTimeout(() => {
    setApearNotification("apear");
  }, 4300);
  setTimeout(() => {
    setApearCandidates("apear");
  }, 4800);

  return (
    <>
      <main className={classes["main-home"]}>
        <div className={classes["background"]}></div>

        <div className={classes["main-container"]}>
          <div className={classes["content-container"]}>
            <div className={classes["text"]}>
              <p className={classes["inner-text"]}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={classes["icon-location"]}
                />{" "}
                Talento esta aqui!
              </p>
              <div className={classes["typing-box"]}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <Typewriter
                  className={classes["typing"]}
                  options={{
                    strings: [
                      "Web Developer",
                      "Data Analyst",
                      "UX/UI Designer",
                      "Cybersecurity Engineer",
                      "Database Admin",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <div
                className={
                  !apearInfoBox1
                    ? classes.opaque
                    : `${classes["info-box"]} ${classes[apearInfoBox1]}`
                }
              >
                <span className={classes.number}>100 +</span> ofertas IT
              </div>
              <div
                className={
                  !apearInfoBox2
                    ? classes.opaque
                    : `${classes["info-box"]} ${classes[apearInfoBox2]}`
                }
              >
                <span className={classes.number}>30 +</span> Empresas
              </div>
              <div
                className={
                  !apearInfoBox3
                    ? classes.opaque
                    : `${classes["info-box"]} ${classes[apearInfoBox3]}`
                }
              >
                <span className={classes.number}>500 + </span> CVs
              </div>
            </div>
          </div>
          <div className={classes["images-container"]}>
            <div className={classes["images-box"]}>
              <div className={classes["images-row"]}>
                <div
                  className={`${classes["image-one-box"]} ${classes["fadeInLeft"]}`}
                >
                  <div
                    className={
                      !apearNotification
                        ? classes.hide
                        : `${classes["notification"]} ${classes[apearNotification]}`
                    }
                  >
                    <span
                      className={`fa-layers fa-fw fa-xl ${classes["icon"]}`}
                    >
                      <FontAwesomeIcon
                        icon={faSquare}
                        className={classes["icon-bg"]}
                      />
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        inverse
                        transform='shrink-8'
                        className={classes["icon-color"]}
                      />
                    </span>
                    <p> Nueva oferta de trabajo</p>
                  </div>
                  <figure className={classes["figure-image"]}>
                    <img src={img1} alt='people' />
                  </figure>
                </div>
                <div
                  className={`${classes["image-two-three-box"]} ${classes["fadeInRight"]}`}
                >
                  <figure className={classes["figure-image"]}>
                    <img src={img2} alt='people' />
                  </figure>
                  <figure className={classes["figure-image"]}>
                    <img src={img3} alt='people' />
                  </figure>
                  <div
                    className={
                      !apearCandidates
                        ? classes.hide
                        : `${classes["candidates"]} ${classes[apearCandidates]}`
                    }
                  >
                    <p>500+ Candidatos</p>
                    <figure className={classes.avatars}>
                      <img src={avatars} alt='avatars' />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
