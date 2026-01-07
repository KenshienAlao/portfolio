import { Github, Facebook, Figma } from "lucide-react";
import SchoolPicture from "../../assets/school.jpeg";
import ProfilePicture from "../../assets/profile.png";
import "./hero.css";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div id="Home" className="container__hero">
      <div className="hero__content">
        {/* Left Side: Text Content */}
        <div className="left-child-container__hero">
          {/* Status Badge with Pulsing Dot */}
          <motion.div
            className="status__badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="pulse-dot"></span>
            1st Year College Student
          </motion.div>

          {/* Main Heading with a Slight Slide */}
          <motion.h1
            className="introduction__section"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm a <span className="gradient-text">Web Developer</span>
          </motion.h1>

          {/* Subtext with a softer fade */}
          <motion.p
            className="sub-introduction__section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            As an aspiring web developer at 18, I am deeply committed to
            mastering the{" "}
            <span className="text-white">
              complexities of modern web technologies
            </span>
            . I focus on refining technical expertise through rigorous daily
            practice.
          </motion.p>

          {/* Social Section */}
          <motion.div
            className="contact-container__section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="box-text">Find me on:</p>
            <div className="contact-information">
              <a href="#" className="information-box" aria-label="Github">
                <Github size={24} />
              </a>
              <a href="#" className="information-box" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="information-box" aria-label="Figma">
                <Figma size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visuals */}
        <div className="right-child-container__hero">
          <div className="image-stack">
            {/* Main Profile Image */}
            <motion.div
              className="picture-card main-img"
              initial={{ opacity: 0, x: 50, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: -3 }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                z: 50,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            >
              <div className="glass-reflection"></div>
              <img src={ProfilePicture} alt="Profile" />
            </motion.div>

            {/* Secondary School Image */}
            <motion.div
              className="picture-card secondary-img"
              initial={{ opacity: 0, x: 80, rotate: 6 }}
              animate={{ opacity: 1, x: 0, rotate: 6 }}
              whileHover={{
                rotate: 10,
                x: 20,
                y: 10,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
            >
              <img src={SchoolPicture} alt="School" />
            </motion.div>

            {/* Animated Decorative Glow */}
            <motion.div
              className="hero-glow"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
