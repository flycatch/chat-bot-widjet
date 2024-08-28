import FAQ from "./FAQ";
import "./index.css";
import NormalBotMessage from "./NormalBotMessage";
import OptionsPrompt from "./OptionsPrompt";
import UserMessage from "./UserMessage";
const Message = ({ sender, message, answer, options, optionClickHandler }) => {
  if (sender === "BOT") {
    if (answer) return <FAQ message={message} answer={answer} />;
    if (options && !!options.length)
      return <OptionsPrompt message={message} options={options} optionClickHandler={optionClickHandler}/>;
    return <NormalBotMessage message={message} />;
  }
  return <UserMessage>{message}</UserMessage>;
};

export default Message;
