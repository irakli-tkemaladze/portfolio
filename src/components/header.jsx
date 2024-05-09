import { AiFillHome } from "react-icons/ai";
import "./header.css";
import { NavLink } from "react-router-dom";

function Header() {
  const navBarElements = [
    {
      adress: "/home",
      svg: <AiFillHome />,
      title: "Home",
    },
    {
      adress: "/about",
      title: "About",
    },
    {
      adress: "/projects",
      title: "Projects",
    },
    {
      adress: "/contact",
      title: "Contact",
    },
  ];

  return (
    <header>
      <nav>
        {navBarElements.map((item, index) => (
          <NavLink key={index} className="navLink" to={item.adress}>
            <div className="headerWrapper">
              <div className="navbarTitle">
                {item.svg}
                <h3>{item.title}</h3>
              </div>
            </div>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export { Header };
