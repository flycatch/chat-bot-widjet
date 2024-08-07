import "./index.css";
import { useState } from "react";
import ChatBotHeader from "../ChatBotHeader/index";
import ChatBotInput from "../ChatBotInput";
import ChatBotFooter from "../ChatBotFooter";
import ChatArea from "../ChatArea";
import Message from "../Message";
import { ChatBotConstants } from "../../constants";

const ChatBot = ({ setActive }) => {
  const [loader, setloader] = useState(false);
  // TO be removed when real workflow is completed.
  const sampleBotMessage = {message: ChatBotConstants.OPTIONS_REQUEST, sender: "BOT" , options: ChatBotConstants.OPTIONS}
  const sampleUserMessage = {message: "Report Issue", sender: "USER" }
  return (
    <div className="widjet_chatbot_flycatch_main-div">
      <ChatBotHeader onClose={() => setActive(false)} isBotTyping={loader} />
      <ChatArea>
        <Message key ={sampleBotMessage.sender} messageDetails={sampleBotMessage}/>
        <Message key ={sampleUserMessage.sender}messageDetails={sampleUserMessage}/>
      </ChatArea>
      <ChatBotInput />
      <ChatBotFooter />
    </div>
  );
};

export default ChatBot;
