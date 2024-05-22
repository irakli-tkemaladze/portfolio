import { AiFillHome } from "react-icons/ai";
import "./header.css";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Header({ messages, setMessages, openPopup }) {
  const [messagesIsRead, setMessagesIsRead] = useState(false);
  const [isDropDawnOpen, setIsDropDawnOpen] = useState(false);
  const messagesRef = useRef();
  useEffect(() => {
    const closeMessages = (e) => {
      if (!messagesRef.current?.contains(e.target)) {
        setIsDropDawnOpen(false);
      }
    };
    const settimeout = setTimeout(() => {
      document.addEventListener("click", closeMessages);
    }, 0);

    return function deleteListener() {
      clearTimeout(settimeout);
      document.removeEventListener("click", closeMessages);
    };
  }, [isDropDawnOpen]);
  const unreadMessages = () => {
    return messages.filter((item) => !item.isRead).length;
  };
  const readMsgs = () => {
    const readmsgs = messages.filter((item) => item.isRead);
    return readmsgs;
  };
  const unreadMsgs = () => {
    const unreadmsgs = messages.filter((item) => !item.isRead);
    return unreadmsgs;
  };
  const readMessage = (item, index) => {
    if (!item.isRead) {
      const newMessagesMasive = [...messages];
      newMessagesMasive[index].isRead = true;
      setMessages(newMessagesMasive);
    }
    openPopup(item);
  };

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
                {item.svg ? item.svg : null}
                <h3>{item.title}</h3>
              </div>
            </div>
          </NavLink>
        ))}
        <NavLink to={"/addproject"} >
          <button className="addProjectBtn">add Project</button>
        </NavLink>
        <div className="dropDawn">
          <div className="messageArea">
            {unreadMessages() ? (
              <div className="messagesLength">
                <span>{unreadMessages()}</span>
              </div>
            ) : null}

            <button
              onClick={() => {
                if (messages.length) {
                  setIsDropDawnOpen(!isDropDawnOpen);
                }
                setMessagesIsRead(false);
              }}
              className="dropDawnBtn"
            >
              <div className="dropDawnImg">
                <div className="line"></div>
                <div className="midleLine"></div>
                <div className="line"></div>
              </div>
            </button>

            {isDropDawnOpen && messages.length ? (
              <div ref={messagesRef} className="messages">
                {(messagesIsRead ? readMsgs() : unreadMsgs()).map(
                  (item, index) => {
                    return (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          readMessage(item, index);
                        }}
                        key={index}
                        className="msgBtn"
                      >
                        <div className="messageCards">
                          <span>{item.customerName}</span>
                          <h3>{item.customerMessage}</h3>
                          <div
                            style={{
                              backgroundColor: item.isRead ? "green" : "brown",
                            }}
                            className="cycle"
                          ></div>
                        </div>
                      </button>
                    );
                  }
                )}
                <div className="btns">
                  <button onClick={() => setMessagesIsRead(false)}>
                    unread
                  </button>
                  <button onClick={() => setMessagesIsRead(true)}>read</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
}

export { Header };
