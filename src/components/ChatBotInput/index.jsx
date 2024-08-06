import "./index.css";
import { ChatBotConstants } from "../../constants";
import { useState } from "react";

const ChatBotInput = () => {
    const [userMessage, setUserMessage] = useState('');

  const UserInputForm = (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* TODO: Attachment upload
      {arrayChat.length === 9 && (
        <div>
          <input
            type="file"
            id="myFile"
            name="filename"
            className="widjet_chatbot_flycatch_image-upload"
            hidden="hidden"
            accept="image/*"
            onChange={(e) => {
              setFileDataObj(Array.from(e.target.files));
              setImageName(Array.from(e.target.files)[0].name);
              setCheckPhoto(true);
            }}
          />
          <div className="widjet_chatbot_flycatch_upload-button-div">
            <button
              type="button"
              id="widjet_chatbot_flycatch_custom-button"
              onClick={() => uploadImageHandler("myFile")}
            >
              <div className="widjet_chatbot_flycatch_upload-img-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0002 21.3334C15.6224 21.3334 15.3059 21.2054 15.0508 20.9494C14.7948 20.6942 14.6668 20.3778 14.6668 20V10.4667L12.1668 12.9667C11.9002 13.2334 11.5891 13.3667 11.2335 13.3667C10.8779 13.3667 10.5557 13.2222 10.2668 12.9334C10.0002 12.6667 9.87261 12.3498 9.88416 11.9827C9.89483 11.6165 10.0224 11.3111 10.2668 11.0667L15.0668 6.26669C15.2002 6.13336 15.3446 6.03869 15.5002 5.98269C15.6557 5.92758 15.8224 5.90002 16.0002 5.90002C16.1779 5.90002 16.3446 5.92758 16.5002 5.98269C16.6557 6.03869 16.8002 6.13336 16.9335 6.26669L21.7335 11.0667C22.0002 11.3334 22.1277 11.6498 22.1162 12.016C22.1055 12.3831 21.9779 12.6889 21.7335 12.9334C21.4668 13.2 21.1504 13.3387 20.7842 13.3494C20.4171 13.3609 20.1002 13.2334 19.8335 12.9667L17.3335 10.4667V20C17.3335 20.3778 17.2059 20.6942 16.9508 20.9494C16.6948 21.2054 16.3779 21.3334 16.0002 21.3334ZM8.00016 26.6667C7.26683 26.6667 6.63927 26.4058 6.1175 25.884C5.59483 25.3614 5.3335 24.7334 5.3335 24V21.3334C5.3335 20.9556 5.46105 20.6387 5.71616 20.3827C5.97216 20.1276 6.28905 20 6.66683 20C7.04461 20 7.3615 20.1276 7.6175 20.3827C7.87261 20.6387 8.00016 20.9556 8.00016 21.3334V24H24.0002V21.3334C24.0002 20.9556 24.1282 20.6387 24.3842 20.3827C24.6393 20.1276 24.9557 20 25.3335 20C25.7113 20 26.0277 20.1276 26.2828 20.3827C26.5388 20.6387 26.6668 20.9556 26.6668 21.3334V24C26.6668 24.7334 26.4059 25.3614 25.8842 25.884C25.3615 26.4058 24.7335 26.6667 24.0002 26.6667H8.00016Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="widjet_chatbot_flycatch_button-text form-scroll">
                {" "}
              </span>
            </button>
            <span className="widjet_chatbot_flycatch_button-text-1">
              {imageName ? imageName : ChatBotConstants.CHOOSE_A_FILE}
            </span>
          </div>
        </div>
      )} */}

      <div className="widjet_chatbot_flycatch_chat-area-with-button">
        <input
          className="widjet_chatbot_flycatch_input"
          placeholder={ChatBotConstants.TYPE_A_MESSAGE}
          value={userMessage}
          name="chat"
          // type={arrayChat.length === 3 ? "email" : "text"}
          id="email"
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          onSubmit
        />

        <button
          className="widjet_chatbot_flycatch_button"
          type="submit"
          name="primary"
          onClick={() => {
            //   userSelection === ChatBotConstants.OPTIONS[1].id &&
            //     (arrayChat.length > 4 ||
            //       (arrayChat.length === 3 && validateEmail(userMessage) === true)) &&
            //     handleSubmit();
          }}
        >
          <div className="widjet_chatbot_flycatch_send-message-icon">
            {true ? (
              <svg
                width="17"
                height="14"
                viewBox="0 0 17 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.13919 13.568C1.85028 13.688 1.57582 13.6616 1.3158 13.4888C1.05579 13.3166 0.925781 13.0655 0.925781 12.7354L0.925781 9.38292C0.925781 9.17291 0.983562 8.98541 1.09912 8.82041C1.21469 8.65541 1.37359 8.55041 1.57582 8.50541L7.85953 6.88539L1.57582 5.26538C1.37359 5.22038 1.21469 5.11538 1.09912 4.95037C0.983562 4.78537 0.925781 4.59787 0.925781 4.38787L0.925781 1.03534C0.925781 0.705334 1.05579 0.453932 1.3158 0.28113C1.57582 0.108928 1.85028 0.0828277 2.13919 0.202829L15.4866 6.05288C15.8478 6.21789 16.0283 6.49539 16.0283 6.88539C16.0283 7.2754 15.8478 7.5529 15.4866 7.7179L2.13919 13.568Z"
                  fill="#080CCB"
                />
              </svg>
            ) : (
              <svg
                width="17"
                height="14"
                viewBox="0 0 17 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.13919 13.568C1.85028 13.688 1.57582 13.6616 1.3158 13.4888C1.05579 13.3166 0.925781 13.0655 0.925781 12.7354L0.925781 9.38292C0.925781 9.17291 0.983562 8.98541 1.09912 8.82041C1.21469 8.65541 1.37359 8.55041 1.57582 8.50541L7.85953 6.88539L1.57582 5.26538C1.37359 5.22038 1.21469 5.11538 1.09912 4.95037C0.983562 4.78537 0.925781 4.59787 0.925781 4.38787L0.925781 1.03534C0.925781 0.705334 1.05579 0.453932 1.3158 0.28113C1.57582 0.108928 1.85028 0.0828277 2.13919 0.202829L15.4866 6.05288C15.8478 6.21789 16.0283 6.49539 16.0283 6.88539C16.0283 7.2754 15.8478 7.5529 15.4866 7.7179L2.13919 13.568Z"
                  fill="#999999"
                />
              </svg>
            )}
          </div>
        </button>
      </div>
    </form>
  );

  return (
    <div className="widjet_chatbot_flycatch_type-area">{UserInputForm}</div>
  );
};

export default ChatBotInput;
