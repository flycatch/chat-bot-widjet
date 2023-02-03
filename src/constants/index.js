import "../components/Chatbox/index.css";

export const ChatBotConstants = {
  BOT: "bot",
  RECEIVER: "reciever",
  EMAIL_REQUEST: (
    <div>
      <span className="Hi-tag">Hi !</span>
      <br />
      I am Alpha, your personal assistant to help you with queries
      <br />
      {/* with queries <br /> */}
    </div>
  ),
  // "Your issue submitted.This is your ticket number: ",
  TITLE_REQUEST: "Great, How may we assist you?",
  DESCRIPTION_REQUEST: "I need to know your issue better, Please describe it.",
  TICKET_NUMBER_RESPONSE: "Your issue submitted.This is your ticket number: ",
  TICKET_LINK:
    "Thanks,our team is working on it and will get back to you as soon as possible. Meanwhile, you can check the status on ",
  CHAT: "Ask Alpha",
  TYPE_A_MESSAGE: "Type here... ",
  CHOOSE_A_FILE: "No image added",
  ONLINE: "Online",
  TYPING: "typing...",
  POWERED_BY: "Powered by",
  FLYCATCH: "Flycatch",
  EMAIL: "  What's your email address?",
  WELCOME_MESSAGE:
    "Hi !,  I am Alpha, your personal assistant to help you with queries ",
};
