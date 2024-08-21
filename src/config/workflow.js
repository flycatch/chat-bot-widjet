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
    responseKey: null,
    options: [
      {
        id: "option-1",
        name: "FAQ",
        workflow: null,
        next: null,
      },
      {
        id: "option-2",
        name: "Report Issue",
        workflow: "reportIssue",
        next: 0,
      },
    ],
  },
];

const reportIssue = [
  {
    id: 1,
    type: "prompt",
    text: ChatBotConstants.EMAIL_REQUEST,
    waitForUserInput: true,
    responseKey: "email",
    inputValidationType: "email"
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
    text: '',
    waitForUserInput: false,
  },
];

const workflowConfig = {
  version: "1.0.0",
  workflows: {
    init,
    reportIssue,
  },
};

export default workflowConfig;
