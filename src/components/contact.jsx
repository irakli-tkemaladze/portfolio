import "./contact.scss";

const Contact = ({
  messages,
  setMessages,
  textareaValue,
  setTextareaValue,
  customerName,
  setCustomerName,
}) => {
  const sendMsg = () => {
    if (textareaValue.trim().length) {
      setMessages([
        {
          customerMessage: textareaValue,
          customerName,
          isRead: false,
        },
        ...messages,
      ]);
      setTextareaValue("");
      setCustomerName("");
    }
  };
  return (
    <div className="contactWrapper">
      <input
        onChange={(e) => setCustomerName(e.target.value)}
        value={customerName}
        placeholder="enter your name"
        className="customerName"
        type="text"
        autoComplete="off"
      ></input>
      <span>enter your message</span>
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
};

export { Contact };
