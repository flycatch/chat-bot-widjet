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
  GREET: "Welcome to Flycatch!",
  ASSIST_OPTION_REQ: "How may we assist you today?",
  RE_SEARCH_REQ: "Could you rephrase your query?",
  OTP_REQ: "Please enter the OTP.",
  FIRST_OTP_SENT: "Email verification required. An OTP has been sent to your email.",
  OTP_SENT: "A new OTP has been sent to your email.",
  OTP_FAIL_VERIFY: "OTP verification failed.",
  OTP_SEND_GEN_ERR: "Error sending the OTP.",
  OTP_EXHAUST_ERR: (time) => `You have reached the OTP verification limit. Please retry after ${time} minutes.`,
  TITLE_REQUEST: "Great, What is the subject or issue you are experiencing?",
  RESOLUTION_PROMPT: "Is your issue resolved or do you want to report an issue?",
  USER_NAME_REQUEST: "Could you also please provide your full name?",
  EMAIL_REQUEST: "What is your email address?",
  SEARCH_RESULTS: "Here are the results that match your query/issue.",
  DESCRIPTION_REQUEST: "Please describe the issue.",
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
      {`You can login to truedesk using the user name: ${userName} to view the ticket details and upload attachments.`}
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
  ERROR_RESPONSE: "There has been an issue creating your ticket.",
  FAQ_CONFIRMATION: "Is your query resolved?",
  THANK_YOU: "Thank you for using the chat bot.",
  FAQ_RESOLUTION_OPTIONS: [
    {
      id: "RESOLVED",
      title: "Yes",
    },
    {
      id: "REPORT-ISSUE",
      title: "No,Report Issue",
    },
  ],
};
