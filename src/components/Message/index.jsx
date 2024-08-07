import BotMessage from "./BotMessage";
import "./index.css";
import UserMessage from "./UserMessage";
const Message = ({ messageDetails }) => {
  const { sender, message, ...restDetails } = messageDetails;
  if (sender === "BOT")
    return <BotMessage message={message} {...restDetails} />;
  return <UserMessage>{message}</UserMessage>;
};

export default Message;
