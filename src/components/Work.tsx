import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Project = {
  id: number;
  name: string;
  category: string;
  tools: string;
  images: string[];
  link?: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Siuex Medical · OpticCare",
    category: "SIUEX · Optical & Pharmacy SaaS",
    tools: "React, Vite, Zustand, Node.js, Express, PostgreSQL, Claude AI, Stripe",
    images: ["images/opticcare.webp"],
    link: "https://www.siuex.com/",
  },
  {
    id: 2,
    name: "Ceylon Bedding & Co.",
    category: "Allion · Luxury Bedding E-Commerce",
    tools: "Next.js, React 19, NestJS, Prisma, PostgreSQL, Stripe, Socket.io, Genkit AI",
    images: ["images/ceylonbedding.webp", "images/ceylonbedding-shop.webp"],
    link: "https://www.ceylonbedding.com/",
  },
  {
    id: 3,
    name: "Prime Wagyu E-Commerce",
    category: "Allion · Premium Food Marketplace",
    tools: "Next.js 15, NestJS, PostgreSQL, Redis, Stripe, Socket.io, Genkit AI, Monorepo",
    images: ["images/wagyu.webp", "images/wagyu-shop.webp"],
    link: "https://wagyunokiwami.com/",
  },
  {
    id: 4,
    name: "Customer Success Platform",
    category: "Velaris · B2B SaaS",
    tools: "React, Node.js, Redux, PostgreSQL, AWS, Sass, Drag-and-drop Workflows",
    images: ["images/velaris.png"],
  },
  {
    id: 5,
    name: "Back-Office Platform",
    category: "Sri Lanka Railways",
    tools: "Next.js, Nest.js, PostgreSQL, Keycloak, Redis, Kubernetes, Docker",
    images: ["images/railwaysback.png"],
  },
  {
    id: 6,
    name: "Customer Portal",
    category: "Sri Lanka Railways",
    tools: "Next.js, React, Zustand, TailwindCSS",
    images: ["images/customerrailway.png"],
  },
  {
    id: 7,
    name: "School Analytics Dashboards",
    category: "OctopusBI · 200+ Schools",
    tools: "React, Next.js, Redux, Ant Design, RBAC, Multi-Tenant",
    images: ["images/analytics.png"],
  },
  {
    id: 8,
    name: "AI Glasses Try-On",
    category: "AI / ML",
    tools: "Python, TensorFlow, Deep Learning, Computer Vision",
    images: ["images/ai.png"],
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
              <WorkImage
                images={project.images}
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
