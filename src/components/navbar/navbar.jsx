import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      x: "-50%",
      y: -20,
    },
    visible: {
      scale: 1,
      opacity: 1,
      x: "-50%",
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        mass: 0.8,
        opacity: {
          duration: 0.4,
        },
      },
    },
  };

  return (
    <motion.nav
      className={scrolled ? "nav blurred" : "nav"}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{
        originX: 0.5,
      }}
    >
      <div className="container__navbar">
        <motion.div
          className="logo__navbar"
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: 2,
          }}
        >
          KENSHIEN
        </motion.div>

        <motion.ul
          className="ul__navbar"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 1,
          }}
        >
          {[
            "Home",
            "About",
            "Skills",
            "Education",
            "Work",
            "Contact",
          ].map((item) => (
            <li key={item} className="li__navbar">
              <a href={`#${item}`} className="link__navbar">
                {item}
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.nav>
  );
}
export default Navbar;
