import { ChatBotConstants } from "../constants";

const init = [
  {
    id: 1,
    type: "greeting",
    text: ChatBotConstants.GREET,
    waitForUserInput: false,
  },
  {
    id: 2,
    type: "prompt",
    text: ChatBotConstants.ASSIST_OPTION_REQ,
    waitForUserInput: true,
    responseKey: "query",
    // options: [
    //   {
    //     id: "option-1",
    //     name: "FAQ",
    //     workflow: "faq",
    //     next: 0,
    //   },
    //   {
    //     id: "option-2",
    //     name: "Report Issue",
    //     workflow: "reportIssue",
    //     next: 0,
    //   },
    // ],
  },
  // {
  //   id: 3,
  //   type: "greeting",
  //   text: "override",
  //   waitForUserInput: false,
  // },
  {
    id: 3,
    type: "embeddedSearch",
    text:"",
    waitForUserInput: false
  },
  {
    id: 4,
    type: "prompt",
    text: ChatBotConstants.RESOLUTION_PROMPT,
    waitForUserInput: true,
    responseKey: null,
    options: [
      {
        id: "option-1",
        name: "Yes",
        workflow: null,
        next: 5,
      },
      {
        id: "option-2",
        name: "No",
        workflow: null,
        next: 4,
      },
      {
        id: "option-3",
        name: "Report Issue",
        workflow: "reportIssue",
        next: 0,
      },
    ],
  },
  {
    id: 5,
    type: "prompt",
    text: ChatBotConstants.RE_SEARCH_REQ,
    waitForUserInput: true,
    responseKey: "query",
    next: {
      onSuccess: 2
    },
  },
  {
    id: 6,
    type: "greeting",
    text: ChatBotConstants.THANK_YOU,
    waitForUserInput: false,
    isEnd: true,
  },
];

const reportIssue = [
  {
    id: 1,
    type: "prompt",
    text: ChatBotConstants.EMAIL_REQUEST,
    waitForUserInput: true,
    responseKey: "email",
    inputValidationType: "email",
  },
  {
    id: 2,
    type: "prompt",
    text: ChatBotConstants.USER_NAME_REQUEST,
    waitForUserInput: true,
    responseKey: "fullname",
  },
  {
    id: 3,
    type: "prompt",
    text: ChatBotConstants.TITLE_REQUEST,
    waitForUserInput: true,
    responseKey: "subject",
  },
  {
    id: 4,
    type: "prompt",
    text: ChatBotConstants.DESCRIPTION_REQUEST,
    waitForUserInput: true,
    responseKey: "issue",
  },
  {
    id: 5,
    type:"send-otp",
    waitForUserInput: false,
    next: {
      onSuccess: 5, //if verified session
      onFailure: 6 //if session unverified
    }
  },
  {
    id: 6,
    type: "report-issue",
    text: "",
    waitForUserInput: false,
    isEnd: true,
  },
  {
    id: 7,
    type: "prompt",
    text: ChatBotConstants.OTP_REQ,
    waitForUserInput: true,
    responseKey: "otp",
    options: [
      {
        id: "option-1",
        name: "Resend",
        workflow: null,
        next: 4,
      }
    ]
  },
  {
    id: 8,
    type:"verify-otp",
    waitForUserInput: false,
    next: {
      onSuccess: 5, 
      onFailure: 8
    }
  },
  {
    id: 9,
    type: "greeting",
    text: ChatBotConstants.OTP_FAIL_VERIFY,
    next: {
      onSuccess: 4
    }
  }
];

const faq = [
  {
    id: 1,
    type: "faqs",
    text: "",
    waitForUserInput: false,
  },
  {
    id: 2,
    type: "prompt",
    text: ChatBotConstants.FAQ_CONFIRMATION,
    waitForUserInput: true,
    responseKey: null,
    options: [
      {
        id: "option-1",
        name: "Yes",
        workflow: null,
        next: 2,
      },
      {
        id: "option-2",
        name: "No, Report Issue",
        workflow: "reportIssue",
        next: 0,
      },
    ],
  },
  {
    id: 3,
    type: "greeting",
    text: ChatBotConstants.THANK_YOU,
    waitForUserInput: false,
  },
];

const workflowConfig = {
  version: "1.0.0",
  workflows: {
    init,
    reportIssue,
    faq,
  },
};

export default workflowConfig;
