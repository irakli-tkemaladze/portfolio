import { Routes, Route } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { Home } from "./home";
import { About } from "./about";
import { Projects } from "./projects";
import { Contact } from "./contact";
import { useState } from "react";
import { Popup } from "./popup";
import { AddProjectPopup } from "./addProjectPopup";
import {NotFound} from "./notFound"

const PortfolioWrapper=() =>{
  const [openedItem, setOpenedItem] = useState(null);
  const [messages, setMessages] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (item) => {
    setOpenedItem({ ...item });
    setIsPopupOpen(true);
  };

  return (
    <div className="appContent">
      <Header
        openPopup={openPopup}
        messages={messages}
        setMessages={setMessages}
      />
      {isPopupOpen ? (
        <Popup
          messages={messages}
          setMessages={setMessages}
          openedItem={openedItem}
          setIsPopupOpen={setIsPopupOpen}
        />
      ) : null}
      <main>
        <Routes>
          <Route path={"/"} exact element={<Home />} />
          <Route path={"addproject"} exact element={<AddProjectPopup />} />
          <Route
            path={"editproject/:key"}
            exact
            element={<AddProjectPopup />}
          />
          <Route path={"home"} element={<Home />} />
          <Route path={"about"} exact element={<About />} />

          <Route path={"projects"} exact element={<Projects />} />
          <Route
            path={"contact"}
            exact
            element={
              <Contact
                messages={messages}
                setMessages={setMessages}
                textareaValue={textareaValue}
                setTextareaValue={setTextareaValue}
                customerName={customerName}
                setCustomerName={setCustomerName}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}


export { PortfolioWrapper };
