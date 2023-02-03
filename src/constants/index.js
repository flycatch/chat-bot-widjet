import "../components/Chatbox/index.css";

export const ChatBotConstants = {
  BOT: "bot",
  RECEIVER: "reciever",
  EMAIL_REQUEST: (
    <div>
      <span className="Hi-tag">Hi !</span>
      <br />I am Alpha, your personal assistant to help you with{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.flycatchtech.com/"
        className="widjet_chatbot_flycatch_text-decorator"
      >
        Flycatch
      </a>{" "}
      related queries.
      <br />
      {/* with queries <br /> */}
    </div>
  ),
  // "Your issue submitted.This is your ticket number: ",
  TITLE_REQUEST: "Great, Let's get started. How may we assist you?",
  DESCRIPTION_REQUEST:
    "Please describe your problem so that I can better understand it.",
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
  EMAIL:
    "  Your problem will be addressed by our team. Please provide us your email so we can send you updates on the status.",
  WELCOME_MESSAGE:
    "Hi !,  I am Alpha, your personal assistant to help you with queries ",
};
