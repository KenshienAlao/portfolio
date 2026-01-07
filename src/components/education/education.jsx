import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, MapPin } from "lucide-react";
import "./education.css";

// Assets (Keep your existing imports)
import EDU1 from "../../assets/kvesu1__picture.png";
import EDU2 from "../../assets/kvnhs__picture.png";
import EDU3 from "../../assets/kvshs__picture.png";
import EDU4 from "../../assets/cdm__picture.png";

const eduData = [
  {
    id: 1,
    img: EDU1,
    school: "Kasiglahan Village Elementary",
    year: "2012 — 2018",
    location: "Rodriguez, Rizal",
  },
  {
    id: 2,
    img: EDU2,
    school: "KV National High School",
    year: "2018 — 2022",
    location: "Rodriguez, Rizal",
  },
  {
    id: 3,
    img: EDU3,
    school: "KV Senior High School",
    year: "2022 — 2023",
    location: "Rodriguez, Rizal",
  },
  {
    id: 4,
    img: EDU4,
    school: "Colegeo De Montalban",
    year: "2025 (Currently)",
    location: "Rodriguez, Rizal",
  },
];

function Education() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % eduData.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + eduData.length) % eduData.length);

  return (
    <div id="Education" className="container__education">
      <div className="edu__wrapper">
        <div className="edu__orb"> </div>
        <div className="edu__card-base">
          <div className="edu__visual">
            <AnimatePresence mode="wait">
              <motion.img
                key={eduData[index].id}
                src={eduData[index].img}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="edu__img"
              />
            </AnimatePresence>
            <motion.div
              className="edu__badge"
              key={`badge-${index}`}
              initial={{ opacity: 0, scale: 0.5, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 1.5,
              }}
            >
              <span className="badge__glimmer"></span>
              {eduData[index].year}
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="edu__details">
            <div className="edu__nav">
              <button onClick={prevSlide} className="nav-arrow">
                <ChevronUp />
              </button>
              <span className="nav-num">0{index + 1}</span>
              <button onClick={nextSlide} className="nav-arrow">
                <ChevronDown />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={eduData[index].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="edu__text"
              >
                <h1 className="edu__title">{eduData[index].school}</h1>
                <div className="edu__location-row">
                  <MapPin size={16} />
                  <span>{eduData[index].location}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
