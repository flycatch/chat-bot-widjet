import { useState } from "react";
import NormalBotMessage from "./NormalBotMessage";

const OptionsPrompt = ({ message, options, optionClickHandler }) => {
  const [optionSelected, setOptionSelected] = useState(false);
  return (
    <>
      <NormalBotMessage message={message} />
      <div className="suggest">
        {options?.map((item) => (
          <button
            className="suggest-item"
            name="tags"
            id={item?.id}
            value={item?.name}
            disabled={optionSelected}
            onClick={() => {
              setOptionSelected(true);
              optionClickHandler(item);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default OptionsPrompt;
