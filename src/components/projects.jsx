import "./project.css";
import contextMenu from "../assets/imgs/contextMenu.PNG";
import popup from "../assets/imgs/popup-app.PNG";
import register from "../assets/imgs/register.PNG";
import todo from "../assets/imgs/todo-app-classes.PNG";
import todoHooks from "../assets/imgs/todo-app-hooks.PNG";
function Projects() {
  const cards = [
    {
      imgSrc: contextMenu,
      title: "contextMenu app",
      href: "https://github.com/irakli-tkemaladze/ol-academy-context-menu",
    },
    {
      imgSrc: popup,
      title: "popup app",
      href: "https://github.com/irakli-tkemaladze/ol-academy-popup-with-handling-outside-click",
    },
    {
      imgSrc: register,
      title: "register form",
      href: "https://github.com/irakli-tkemaladze/easy-form",
    },
    {
      imgSrc: todo,
      title: "todo app with classes",
      href: "https://github.com/irakli-tkemaladze/ol-academy-react-todo",
    },
    {
      imgSrc: todoHooks,
      title: "todo app with hooks",
      href: "https://github.com/irakli-tkemaladze/ol-academy-react-todo-hooks",
    },
  ];

  return (
    <div className="wrapperContainer">
      {cards.map((item, index) => (
        <a target="_blank" rel="noreferrer" key={index} href={item.href} className="projects">
          <div className="card">
            <img src={item.imgSrc} alt="Avatar" />
            <div className="container">
              <h4>
                <b>{item.title}</b>
              </h4>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export { Projects };
