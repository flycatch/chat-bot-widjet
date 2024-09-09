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
    next: 2,
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
    type: "report-issue",
    text: "",
    waitForUserInput: false,
  },
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
