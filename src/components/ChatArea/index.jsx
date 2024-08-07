import "./index.css";
import { useRef } from "react";

const ChatArea = ({ children }) => {
  const elementRef = useRef();
  const alwaysScrollToBottom = () => {
    elementRef?.current?.scrollIntoView();
  };
  return (
    <>
      <div className="widjet_chatbot_flycatch_chat-area" id="scrollTop">
        {children}
      </div>
      <div ref={elementRef} />
    </>
  );
};

export default ChatArea;
