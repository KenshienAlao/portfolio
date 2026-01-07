import Skills from "../../components/skills/skills.jsx";
import Education from "../../components/education/education.jsx";
import Footer from "../../components/footer/footer.jsx";
import About from "../../components/about/about.jsx";
import Hero from "../../components/hero/hero.jsx";
import Navbar from "../../components/navbar/navbar.jsx";

import "./home.css";

function Home() {
  return (
    <div className="Homepage__container">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
      </main>
    </div>
  );
}
export default Home;
