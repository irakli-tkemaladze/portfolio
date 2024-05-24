/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import "./popup.scss";

const Popup = ({ setIsPopupOpen, openedItem, messages, setMessages }) => {
  const popupRef = useRef();
  useEffect(() => {
    const popup = (e) => {
      if (!popupRef.current?.contains(e.target)) {
        setIsPopupOpen(false);
      }
    };
    document.body.style.overflowY = "hidden";
    const settimeout = setTimeout(() => {
      document.addEventListener("click", popup);
    }, 0);
    return function deleteListener() {
      clearTimeout(settimeout);
      document.removeEventListener("click", popup);
      document.body.style.overflowY = "auto";
    };
  }, []);

  const markAsDone = () => {
    const newMessages = messages.filter(
      (item) => openedItem.customerMessage !== item.customerMessage
    );
    setMessages(newMessages);
    setIsPopupOpen(false);
  };
  return (
    <div className="popupWrapper">
      <div ref={popupRef} className="popup">
        <span> {openedItem.customerName} </span>
        <span> {openedItem.customerMessage} </span>
        <div className="btns">
          <button onClick={markAsDone} className="doneBtn">
            done
          </button>
          <button onClick={() => setIsPopupOpen(false)} className="closeBtn">
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export { Popup };
