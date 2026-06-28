import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  images: string[];
  alt?: string;
  link?: string;
}

const WorkImage = ({ images, alt, link }: Props) => {
  const [active, setActive] = useState(0);
  const src = images[active] ?? images[0];

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={link}
        target="_blank"
        data-cursor={"disable"}
      >
        {link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={src} alt={alt} />
      </a>
      {images.length > 1 && (
        <div className="work-thumbs">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              className={
                "work-thumb" + (i === active ? " work-thumb-active" : "")
              }
              onClick={() => setActive(i)}
              data-cursor="disable"
              aria-label={`View image ${i + 1}`}
            >
              <img src={img} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
