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
                <h4>Founder & Software Engineer</h4>
                <h5>SIUEX</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Founded SIUEX, delivering end-to-end Hospital, Event and
              Restaurant management systems with microservices, plus a dual-mode
              medical SaaS platform for opticals and pharmacies.
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
            <p>
              Built multi-tenant React analytics dashboards adopted by 200+
              schools and 2,000+ users across Australia, integrated with Canvas
              LMS and Google Classroom.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Software Engineer</h4>
                <h5>Velaris</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Owned core areas of a B2B customer-success SaaS — including a
              flagship drag-and-drop workflow builder — across React, Node.js and
              PostgreSQL on AWS, while mentoring developers and shaping
              architecture.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Tech Lead</h4>
                <h5>Allion Technologies</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading delivery of a low-code orchestration platform for banking
              and insurance on Azure (Service Bus & Durable Functions), plus
              AI/RAG pipelines powered by Claude and GPT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
