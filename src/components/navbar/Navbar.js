import React, { useState } from "react";
// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
// ROUTING
import { Link } from "react-router-dom";
// DATA FILE
import { SidebarData } from "./SlidebarData";
// STYLES
import styles from "../../styles/navbar.module.css";
//Logo
import logo from "../../assets/img/logo-negro.png";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{}}>
        {/* All the icons now are white */}

        <div className={`${styles.navbar}`}>
          <Link to='#' className={`${styles["menu-bars"]}`}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        {/* Navegación */}
        <nav
          className={
            sidebar
              ? `${styles["nav-menu"]} ${styles.active}`
              : `${styles["nav-menu"]}`
          }
        >
          <ul className={`${styles["nav-menu-items"]}`} onClick={showSidebar}>
            <li className={`${styles["navbar-toggle"]}`}>
              <img className={styles.logo} src={logo} alt='' />
              <Link className={`${styles["menu-bars"]}`}></Link>
              <AiIcons.AiOutlineClose />
            </li>
            <div className={`${styles["nav-text1"]}`}>
              {SidebarData.map(({ path, title }, index) => {
                return (
                  <li key={index} className={`${styles["nav-text"]}`}>
                    <Link to={path}>
                      <span className={styles.title}>{title}</span>
                    </Link>
                  </li>
                );
              })}
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
