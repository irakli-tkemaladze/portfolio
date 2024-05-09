import { useState } from "react";
import "./contact.css";

function Contact() {
  const [textareaValue, setTextareaValue] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMsg = () => {
    if(textareaValue.trim().length){
        setMessages([{textareaValue}, ...messages]);
        setTextareaValue("");
    }
  };
  return (
    <div className="contactWrapper">
      <div className="contact">
        <textarea
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button onClick={sendMsg}>send</button>
      </div>
    </div>
  );
}

export { Contact };
