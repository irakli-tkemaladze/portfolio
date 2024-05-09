import "./footer.css";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
function Footer() {
  const svgs = [
    {
      svg: <FaInstagram />,
      color: "red",
    },
    {
      svg: <FaFacebook />,
      color: "blue",
    },
    {
      svg: <FaTwitter />,
      color: "aqua",
    },
    {
      svg: <FaYoutube />,
      color: "red",
    },
  ];

  return (
    <div className="footer">
      <div className="text">
        <h1>@copyright</h1>
      </div>
      <div className="svgs">
        {svgs.map((item, index) => {
          return (
            <a key={index} href="#" style={{ color: item.color }}>
              {item.svg}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export { Footer };
