import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./contextMenu.scss";
import CrudServiceForProjects from "../services/projectsCrudService";
const ContextMenu = ({ closeContextMenu, contexMenuData }) => {
  const cardsRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!cardsRef?.current?.contains(event.target)) {
        closeContextMenu();
      }
    };
    let listenerTimeout = setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);
    return function removeListener() {
      clearTimeout(listenerTimeout);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={cardsRef} className="contextMenuWrapper">
      <h3>{contexMenuData.projectName}</h3>
      <div className="btnContainer">
        <button
          style={{ backgroundColor: "yellow" }}
          onClick={() => {
            navigate(`/editproject/${contexMenuData.key}`);
          }}
        >
          edit
        </button>
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => {
            CrudServiceForProjects.delete(contexMenuData.key);
            closeContextMenu();
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export { ContextMenu };
