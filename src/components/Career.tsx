import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Siuex</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Free-lance work and remote work for various clients, companies and
              startups.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>OctopusBI</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>Software Engineer - Full Stack Developer - Frontend Developer</p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Software Engineer</h4>
                <h5>Velaris</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Senior Software Engineer - Full Stack Developer working in
              designing systems for both front end and backend. Scrum master and
              team lead experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
