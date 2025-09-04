import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import "./styles/SocialIcons.css";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  const handleResumeDownload = () => {
    const resumeUrl = `${
      import.meta.env.BASE_URL
    }resume/AshainSiriwardane_Resume.pdf`;

    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "AshainSiriwardane_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/sinfulExiled" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/ashain-siriwardane-1a861785/"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/ashainsiriwardana?igsh=d2tibDNwNzh1ZTAz"
            target="_blank"
          >
            <FaInstagram />
          </a>
        </span>
      </div>

      <button className="resume-button" onClick={handleResumeDownload}>
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </button>
    </div>
  );
};

export default SocialIcons;
