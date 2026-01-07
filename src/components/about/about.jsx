import "./about.css";

function About() {
  return (
    <section id="About" className="container__about">
      <div className="about__blob"></div>

      <div className="parent-container__about">
        <div className="header__wrapper">
          <span className="subtitle__about">Discovery</span>
          <h1 className="title__about">About Me</h1>
          <div className="title__line"></div>
        </div>

        <div className="content__grid">
          <div className="text__section">
            <h2 className="name__about">
              Clarenze Kenshien A. <span className="highlight">Alao</span>
            </h2>
            <p className="information__about">
              Currently navigating my first year of college, I am a developer
              fueled by a passion for{" "}
              <span className="text-white">clean code</span> and
              <span className="text-white"> immersive UI</span>. I specialize in
              building responsive, performance-driven web applications that
              prioritize user experience.
            </p>
            <p className="information__about">
              For me, development isn't just a career path—it’s a daily practice
              of discipline, creativity, and constant evolution.
            </p>

            <div className="actions__about">
              <button className="btn-ash">
                <span className="btn-text">See my Education</span>
                <span className="btn-shimmer"></span>
              </button>
            </div>
          </div>

          <div className="stats__grid">
            <div className="stat__card">
              <span className="stat__number">01</span>
              <span className="stat__label">Frontend Architect</span>
            </div>
            <div className="stat__card">
              <span className="stat__number">02</span>
              <span className="stat__label">UI/UX Designer</span>
            </div>
            <div className="stat__card">
              <span className="stat__number">03</span>
              <span className="stat__label">Interface Design</span>
            </div>
            <div className="stat__card">
              <span className="stat__number">04</span>
              <span className="stat__label">React Specialist</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
