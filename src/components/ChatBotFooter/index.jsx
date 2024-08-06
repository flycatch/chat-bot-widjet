import "./index.css"
import { ChatBotConstants } from "../../constants";

const ChatBotFooter = () => (
  <div className="widjet_chatbot_flycatch_footer">
    <span className="widjet_chatbot_flycatch_footer-text-1">
      {" "}
      {ChatBotConstants.POWERED_BY}{" "}
    </span>
    <a
      href="https://www.flycatchtech.com/"
      className="widjet_chatbot_flycatch_text-decorator"
    >
      <span className="widjet_chatbot_flycatch_footer-text-2">
        {ChatBotConstants.FLYCATCH}
      </span>
    </a>
  </div>
);

export default ChatBotFooter;
