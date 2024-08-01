import { env_var } from "../config/env";

export const ChatBotConstants = {
  BOT: "bot",
  RECEIVER: "reciever",
  // EMAIL_REQUEST: (
  //   <div>
  //     Welcome to Flycatch!
  //     <br />
  //     What is your email address? <br />
  //   </div>
  // ),
  OPTIONS_REQUEST: (
    <div>
      Welcome to Flycatch!
      <br />
      How may we assist you today?
      <br />
    </div>
  ),
  TITLE_REQUEST: "Great, What is the subject or issue you’re experiencing?",
  USER_NAME_REQUEST: "Could you also please provide your full name?",
  EMAIL_REQUEST: "What is your email address?",
  DESCRIPTION_REQUEST: "Please describe the issue",
  TICKET_NUMBER_RESPONSE: (ticketId, userName) => (
    <div>
      Your issue has been submitted.
      <br />
      Your ticket number is{" "}
      <a
        href={`${env_var.BASE_URL}/tickets/${ticketId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ticketId}
      </a>
      <br />
      {`You can login to truedesk using the user name: ${userName}`}
    </div>
  ),
  CHAT: "Alpha",
  TYPE_A_MESSAGE: "Type here... ",
  CHOOSE_A_FILE: "No image added",
  ONLINE: "Online",
  TYPING: "typing...",
  POWERED_BY: "Powered by",
  FLYCATCH: "Flycatch",
  OPTIONS: [
    {
      id: "FAQ",
      title: "FAQ",
    },
    {
      id: "REPORT-ISSUE",
      title: "Report Issue",
    },
  ],
  ERROR_RESPONSE:"There has been an issue creating your ticket"
};
