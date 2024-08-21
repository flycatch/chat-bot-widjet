import NormalBotMessage from "./NormalBotMessage";

const OptionsPrompt = ({ message, options, optionClickHandler }) => (
  <>
    <NormalBotMessage message={message} />
    <div className="suggest">
      {options?.map((item) => (
        <button
          className="suggest-item"
          name="tags"
          id={item?.id}
          value={item?.name}
          onClick={() => optionClickHandler(item)}
        >
          {item.name}
        </button>
      ))}
    </div>
  </>
);

export default OptionsPrompt;
