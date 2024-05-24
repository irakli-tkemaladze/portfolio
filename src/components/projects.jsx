import "./project.scss";
import { useState } from "react";
import { ContextMenu } from "./contextMenu";

import { useEffect } from "react";
import CrudServiceForProjects from "../services/projectsCrudService";
const Projects = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    let data = [];
    const onDataChange = (items) => {
      data = [];
      items.forEach((dataItem) => {
        const tmpData = dataItem.val();
        data.push({
          key: dataItem.key,
          ...tmpData,
        });
      });
      setCards(data);
      setIsLoading(false);
    };
    const projectRef = CrudServiceForProjects.getAll();
    projectRef.on("value", onDataChange);
    return () => {
      projectRef.off("value", onDataChange);
    };
  }, []);

  const handleContextMenuClick = (e, index) => {
    e.preventDefault();
    setSelectedIndex(index);
  };

  const closeContextMenu = () => {
    setSelectedIndex(null);
  };

  return (
    <div className="wrapperContainer">
      {isLoading ? (
        <div className="spinnerWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="cardsWrapper">
          {cards.map((item, index) => (
            <a
              onContextMenu={($event) => handleContextMenuClick($event, index)}
              target="_blank"
              rel="noreferrer"
              key={index}
              href={item.href}
              className="projects"
            >
              <div className="card">
                <h3 style={{ textAlign: "center" }}>
                  created by {item.framework}
                </h3>
                <img src={item.imgSrc} alt="Avatar" />
                <div className="container">
                  <h4 style={{ textAlign: "center" }}>
                    <b>{item.projectName}</b>
                  </h4>
                </div>
              </div>
              {selectedIndex === index ? (
                <div
                  onClick={($event) => {
                    $event.preventDefault();
                  }}
                  className="contextMenu"
                >
                  <ContextMenu
                    contexMenuData={item}
                    closeContextMenu={closeContextMenu}
                  ></ContextMenu>
                </div>
              ) : null}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export { Projects };
