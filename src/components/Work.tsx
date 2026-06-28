import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    id: 1,
    name: "Customer Success Platform",
    category: "Velaris · B2B SaaS",
    tools: "React, Node.js, Redux, PostgreSQL, AWS, Sass, Drag-and-drop Workflows",
    image: "images/velaris.png",
  },
  {
    id: 2,
    name: "Back-Office Platform",
    category: "Sri Lanka Railways",
    tools: "Next.js, Nest.js, PostgreSQL, Keycloak, Redis, Kubernetes, Docker",
    image: "images/railwaysback.png",
  },
  {
    id: 3,
    name: "Customer Portal",
    category: "Sri Lanka Railways",
    tools: "Next.js, React, Zustand, TailwindCSS",
    image: "images/customerrailway.png",
  },
  {
    id: 4,
    name: "School Analytics Dashboards",
    category: "OctopusBI · 200+ Schools",
    tools: "React, Next.js, Redux, Ant Design, RBAC, Multi-Tenant",
    image: "images/analytics.png",
  },
  {
    id: 5,
    name: "AI Glasses Try-On",
    category: "AI / ML",
    tools: "Python, TensorFlow, Deep Learning, Computer Vision",
    image: "images/ai.png",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;

      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and Features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
