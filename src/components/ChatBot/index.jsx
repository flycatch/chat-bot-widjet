
import { useState } from "react";
import { ChatBotConstants } from "../../constants";
import ChatBotHeader from "../ChatBotHeader/index";

const ChatBot = ({ setActive }) => {
  const [loader, setloader] = useState(false);
  return (
    <div className="widjet_chatbot_flycatch_main-div">
      <ChatBotHeader onClose={() => setActive(false)} isBotTyping={loader} />
    </div>
  );
};

export default ChatBot;
