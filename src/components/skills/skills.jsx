import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./skills.css";

const skillsData = {
  Design: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
  Frontend: ["React", "JavaScript (ES6+)", "HTML5", "Redux"],
  Styling: ["CSS3", "Tailwind CSS", "Sass", "Framer Motion"],
  "Tools/Deploy": ["Git", "GitHub", "Vite", "Vercel", "NPM"],
};

// Animation Variants for the staggered effect
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This creates the "wave" effect
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  return (
    <div id="Skills" className="container__skills">
      <div className="wrapper__skills">
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="skills__top-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Expertise & Craftsmanship
          </motion.span>

          <h2 className="skills__title">
            Turning Complex Ideas into <br />
            <span className="gradient-text">Digital Reality</span>
          </h2>

          <p className="skills__subtitle">
            I leverage a modern suite of technologies to build high-performance
            interfaces that are as functional as they are beautiful.
          </p>

          {/* An astonishing decorative divider */}
          <motion.div
            className="skills__divider"
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>

        <div className="category__section">
          <ul className="category__options">
            {Object.keys(skillsData).map((cat) => (
              <li
                key={cat}
                className={`options ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {/* The span ensures the text label has a constant width */}
                <span className="option__label">{cat}</span>

                <AnimatePresence>
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="pill"
                      className="active-bg-pill"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        <div className="skills__display">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              className="skills__grid"
            >
              {skillsData[activeCategory].map((skill) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="skill__card"
                >
                  {/* Decorative background glow inside the card */}
                  <div className="card__glow"></div>

                  <div className="skill__content">
                    <span className="skill__dot"></span>
                    <span className="skill__name">{skill}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
export default Skills;
