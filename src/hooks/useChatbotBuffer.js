import { useState } from "react";

export const useChatbotBuffer = () => {
  const [buffer, setBuffer] = useState([]);
  const [userInputs, setUserInputs] = useState({});

  const addMessageToBuffer = (message) => {
    if (Array.isArray(message)) setBuffer((prev) => [...prev, ...message]);
    else setBuffer((prev) => [...prev, message]);
  };

  const addUserInput = (key, value) => {
    setUserInputs((inputs) => ({ ...inputs, [key]: value }));
  };

  return { buffer, addMessageToBuffer, userInputs, addUserInput };
};
