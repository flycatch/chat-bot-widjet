import "./index.css";
import { useEffect, useRef, useState } from "react";
import ChatBotHeader from "../ChatBotHeader/index";
import ChatBotInput from "../ChatBotInput";
import ChatBotFooter from "../ChatBotFooter";
import ChatArea from "../ChatArea";
import Message from "../Message";
import { ChatBotConstants } from "../../constants";
import { getFaqs } from "../../services/faq";
import { createTicket } from "../../services/report-issue";
import workflowConfig from "../../config/workflow";
import { useChatbotBuffer } from "../../hooks/useChatbotBuffer";

const ChatBot = ({ setActive }) => {
  const [loader, setloader] = useState(false);
  const { workflows } = workflowConfig;
  const [currentWFStep, setCurrentWFStep] = useState(null);
  const [currentWFStepCount, setCurrentWFStepCount] = useState(null);
  const [currentWorkFlow, setCurrentWorkFlow] = useState(null);
  const { buffer, addMessageToBuffer, userInputs, addUserInput } =
    useChatbotBuffer();
  const [textBoxEnabled, setTextBoxEnabled] = useState(false);

  const elementRef = useRef();

  const alwaysScrollToBottom = () => {
    elementRef?.current?.scrollIntoView();
  };

  useEffect(() => alwaysScrollToBottom(), [buffer.length]);

  const nextStep = () => {
    setCurrentWFStepCount((step) => {
      setCurrentWFStep(currentWorkFlow[step + 1]);
      return step + 1;
    });
  };

  const onOptionSelect = (option) => {
    if (currentWFStep.responseKey != null) {
      addUserInput(currentWFStep.responseKey, option.name);
    }
    const userOptionMessage = <Message sender="USER" message={option.name} />;
    addMessageToBuffer(userOptionMessage);
    if (option.workflow) {
      setCurrentWorkFlow(workflows[option.workflow]);
      setCurrentWFStepCount(0);
      setCurrentWFStep(workflows[option.workflow][0]);
    }
  };

  const onUserTextInput = (userInput) => {
    if (currentWFStep.responseKey != null) {
      addUserInput(currentWFStep.responseKey, userInput);
    }
    const userOptionMessage = <Message sender="USER" message={userInput} />;
    addMessageToBuffer(userOptionMessage);
    nextStep();
  };

  const reportIssue = async () => {
    const { email, fullname, subject, issue } = userInputs;
    const reportIssueData = {
      user: {
        fullname,
        email,
      },
      ticket: {
        subject,
        issue,
      },
      // captcha: "rROB",
    };

    const {
      ticket: { uid },
      userData: {
        savedUser: { username },
      },
    } = await createTicket(reportIssueData);
    const responseMessage = (
      <Message
        sender="BOT"
        message={ChatBotConstants.TICKET_NUMBER_RESPONSE(uid, username)}
      />
    );
    addMessageToBuffer(responseMessage);
  };

  useEffect(() => {
    if (currentWFStep === null) {
      setCurrentWFStep(workflows.init[0]);
      setCurrentWorkFlow(workflows.init);
      setCurrentWFStepCount(0);
    } else if (currentWFStep != null) {
      let messageComponent;
      if (currentWFStep.type === "greeting") {
        messageComponent = (
          <Message sender="BOT" message={currentWFStep.text} />
        );
      } else if (currentWFStep.type === "prompt") {
        messageComponent = (
          <Message
            sender="BOT"
            message={currentWFStep.text}
            options={currentWFStep.options}
            optionClickHandler={onOptionSelect}
          />
        );
      } else if (currentWFStep.type === "report-issue") {
        setTextBoxEnabled(false);
        reportIssue();
      }
      if (currentWFStep.type !== "report-issue") {
        addMessageToBuffer(messageComponent);
        if (currentWFStep.waitForUserInput) {
          if (!currentWFStep?.options?.length) setTextBoxEnabled(true);
          else setTextBoxEnabled(false);
        } else {
          nextStep();
        }
      }
    }
  }, [currentWFStep]);

  return (
    <div className="widjet_chatbot_flycatch_main-div">
      <ChatBotHeader onClose={() => setActive(false)} isBotTyping={loader} />
      <ChatArea>
        {buffer?.map((message) => message)}
        <div ref={elementRef} />
      </ChatArea>
      <ChatBotInput
        enabled={textBoxEnabled}
        onUserSubmit={onUserTextInput}
        type={currentWFStep?.inputValidationType}
      />
      <ChatBotFooter />
    </div>
  );
};

export default ChatBot;
