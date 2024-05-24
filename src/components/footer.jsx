import "./footer.scss";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
const svgs = [
  {
    svg: <FaInstagram />,
    color: "red",
    href: "http://instagram.com",
  },
  {
    svg: <FaFacebook />,
    color: "blue",
    href: "http://facebook.com",
  },
  {
    svg: <FaTwitter />,
    color: "aqua",
    href: "http://twitter.com",
  },
  {
    svg: <FaYoutube />,
    color: "red",
    href: "http://youtube.com",
  },
];
const Footer = () => {
  return (
    <div className="footer">
      <div className="text">
        <h1>@copyright</h1>
      </div>
      <div className="svgs">
        {svgs.map((item, index) => (
          <a
            target="_blank"
            rel="noreferrer"
            key={index}
            href={item.href}
            style={{ color: item.color }}
          >
            {item.svg}
          </a>
        ))}
      </div>
    </div>
  );
};

export { Footer };
