import "./index.css";
import { useEffect, useRef, useState } from "react";
import ChatBotHeader from "../ChatBotHeader/index";
import ChatBotInput from "../ChatBotInput";
import ChatBotFooter from "../ChatBotFooter";
import ChatArea from "../ChatArea";
import Message from "../Message";
import { ChatBotConstants } from "../../constants";
import { sendOTPInMail, verifyEmail } from "../../services/otp";
import { getSearchResults } from "../../services/search";
import { createTicket } from "../../services/report-issue";
import workflowConfig from "../../config/workflow";
import { useChatbotBuffer } from "../../hooks/useChatbotBuffer";

const ChatBot = ({ setActive }) => {
  const [loader, setLoader] = useState(false);
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

  const nextStep = (isSuccess = true, args = {}) => {
    if (!currentWFStep.isEnd) {
      if (currentWFStep.next) {
        const{onSuccess, onFailure} = currentWFStep.next;
        const nextStep = isSuccess ? onSuccess : onFailure;
        if (typeof nextStep === "function") {
          const nextStepValue = nextStep(args)
          setCurrentWFStepCount(nextStepValue);
          setCurrentWFStep(currentWorkFlow[nextStepValue]);
        } else {
          setCurrentWFStepCount(nextStep);
          setCurrentWFStep(currentWorkFlow[nextStep]);
        }
      } else {
        setCurrentWFStepCount((step) => {
          setCurrentWFStep(currentWorkFlow[step + 1]);
          return step + 1;
        });
      }
    }
  };

  const onOptionSelect = (option) => {
    if (currentWFStep.responseKey != null) {
      addUserInput(currentWFStep.responseKey, option.name);
    }
    const userOptionMessage = <Message sender="USER" message={option.name} key={new Date()} />;
    addMessageToBuffer(userOptionMessage);
    if (option.workflow) {
      setCurrentWorkFlow(workflows[option.workflow]);
      setCurrentWFStepCount(0);
      setCurrentWFStep(workflows[option.workflow][0]);
    } else if (option.next != null) {
      setCurrentWFStepCount(option.next);
      setCurrentWFStep(currentWorkFlow[option.next]);
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

  // const generateFAQs = async () => {
  //   setLoader(true);
  //   const { data: faqs } = await getFaqs();
  //   const FAQMessages = faqs.map((faq) => (
  //     <Message
  //       key={faq._id}
  //       sender="BOT"
  //       message={faq.question}
  //       answer={faq.answer}
  //     />
  //   ));
  //   setLoader(false);
  //   addMessageToBuffer(FAQMessages);
  //   nextStep();
  // };

  const generateSearchResults = async () => {
    setLoader(true);
    const { results } = await getSearchResults(userInputs.query);
    const FAQMessages = results.map(({ source }) => (
      <Message
        key={source._id}
        sender="BOT"
        message={source.question}
        answer={source.answer}
      />
    ));
    setLoader(false);
    addMessageToBuffer([
      <Message
        key={new Date()}
        sender="BOT"
        message={ChatBotConstants.SEARCH_RESULTS}
      />,
      ...FAQMessages,
    ]);
    nextStep();
  };

  const sendOTP = async() => {
    setLoader(true);
    try{
      const {success, verified = false, limit, remainingRetries} = await sendOTPInMail(userInputs.email);
      nextStep(true, {isSessionVerified: Boolean(verified) && success, isFirstTry: limit - remainingRetries === 1});
    } catch(error) {
      let errorMessage = ChatBotConstants.OTP_SEND_GEN_ERR;
      if(error.response) {
        if(error.response.status === 429) {
          const {data: {remainingRetries, retryAfter}} = error.response;
          if(remainingRetries === 0)
            errorMessage = ChatBotConstants.OTP_EXHAUST_ERR(retryAfter/60);
        }
      }
      addMessageToBuffer(<Message sender="BOT" message={errorMessage} />);
    } finally{
      setLoader(false);
    }
  }

  const verifyOTP = async() => {
    setLoader(true);
    try{
      await verifyEmail(userInputs.email, userInputs.otp);
      nextStep(true);
    } catch(error) {
      nextStep(false)
    } finally{
      setLoader(false);
    }
  }

  const reportIssue = async () => {
    setLoader(true);
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
    let responseMessage;
    try {
      const {
        ticket: { uid },
        userData: {
          savedUser: { username },
        },
      } = await createTicket(reportIssueData);
      responseMessage = (
        <Message
          sender="BOT"
          message={ChatBotConstants.TICKET_NUMBER_RESPONSE(uid, username)}
        />
      );
    } catch (_) {
      responseMessage = (
        <Message sender="BOT" message={ChatBotConstants.ERROR_RESPONSE} />
      );
    } finally {
      setLoader(false);
      addMessageToBuffer(responseMessage);
      nextStep();
    }
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
      // else if (currentWFStep.type === "faqs") {
      //   setTextBoxEnabled(false);
      //   generateFAQs();
      // }
      else if (currentWFStep.type === "embeddedSearch") {
        setTextBoxEnabled(false);
        generateSearchResults();
      }
      else if(currentWFStep.type === "send-otp") {
        setTextBoxEnabled(false);
        sendOTP();
      }
      else if(currentWFStep.type === "verify-otp") {
        setTextBoxEnabled(false);
        verifyOTP();
      }
      if (
        currentWFStep.type !== "report-issue" &&
        currentWFStep.type !== "send-otp" &&
        currentWFStep.type !== "embeddedSearch" &&
        currentWFStep.type !== "verify-otp"

      ) {
        addMessageToBuffer(messageComponent);
        if (currentWFStep.waitForUserInput) {
          if (!currentWFStep?.options?.length || currentWFStep?.options?.length === 1) setTextBoxEnabled(true);
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
