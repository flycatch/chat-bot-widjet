
import { useState } from "react";
import { ChatBotConstants } from "../../constants";
import ChatBotHeader from "../ChatBotHeader/index";
import ChatBotInput from "../ChatBotInput";
import ChatBotFooter from "../ChatBotFooter";

const ChatBot = ({ setActive }) => {
  const [loader, setloader] = useState(false);
  return (
    <div className="widjet_chatbot_flycatch_main-div">
      <ChatBotHeader onClose={() => setActive(false)} isBotTyping={loader} />
      <ChatBotInput />
      <ChatBotFooter/>
    </div>
  );
};

export default ChatBot;
