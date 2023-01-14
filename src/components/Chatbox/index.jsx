import React, { useEffect, useRef, useState } from "react";
import { env_var } from "../../config/env";
import { ChatBotConstants } from "../../constants";
import { post, put } from "../../service/apiServices";
import "./index.css";

const Chatbox = ({ setActive }) => {
  const [chat, setChatData] = useState("");
  const [checkPhoto, setCheckPhoto] = useState(false);
  const [fileId, setFileId] = useState();

  const [imageName, setImageName] = useState("");
  const [validationEmail, setValidationEmail] = useState(false);

  const [loader, setloader] = useState(false);
  const [fileDataObj, setFileDataObj] = useState([]);
  const [arrayChat, setArrayChat] = useState([
    {
      sender: ChatBotConstants.BOT,
      message: ChatBotConstants.EMAIL_REQUEST,
    },
  ]);
  const [apiData, setApiData] = useState([
    {
      email: "",
      title: "",
      description: "",
    },
  ]);
  const elementRef = useRef();
  const AlwaysScrollToBottom = () => {
    elementRef?.current?.scrollIntoView();
  };
  const validateEmail = (chat) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(chat);
  };

  useEffect(() => {
    AlwaysScrollToBottom();
  }, [arrayChat.length]);
  const formDataConverter = (input) => {
    const formData = new FormData();
    formData.append("file", input[0]);
    return formData;
  };

  const handlesubmit = () => {
    if (chat !== "") {
      const arr = arrayChat;
      arr.push({
        sender: ChatBotConstants.RECEIVER,
        message: chat,
      });
      switch (arr.length) {
        case 2:
          arr.push({
            sender: ChatBotConstants.BOT,
            message: ChatBotConstants.TITLE_REQUEST,
          });
          break;
        case 4:
          arr.push({
            sender: ChatBotConstants.BOT,
            message: ChatBotConstants.DESCRIPTION_REQUEST,
          });
          break;
        default:
      }
      setArrayChat(arr);
      setChatData("");

      arr.length >= 5 &&
        setApiData({
          submitter: arrayChat[1]?.message,
          title: arrayChat[3]?.message,
          description: arrayChat[5] && arrayChat[5]?.message,
          ticketPriorityId: 1,
          issueTypeId: 1,
        });
      AlwaysScrollToBottom();
    }
  };

  const imageApi = async () => {
    const postData = await post(
      `${env_var.BASE_URL}/file`,
      formDataConverter(fileDataObj)
    );
    setFileId(postData.data.fileId);
    return postData;
  };
  useEffect(() => {
    if (arrayChat.length === 6) {
      const postData = async () => {
        setloader(true);
        try {
          const ticketApi = await post(`${env_var.BASE_URL}/ticket`, apiData);
          setloader(false);
          const array = arrayChat;
          array.push({
            sender: ChatBotConstants.BOT,
            message: `${ChatBotConstants.TICKET_NUMBER_RESPONSE} `,
          });

          return ticketApi;

          // setArrayChat([...array]);
          // if (checkPhoto) {
          //   // console.log("this is image");
          //   imageApi();
          //   return ticketApi;
          // }
        } catch (err) {
          return err.response;
        }
      };
      postData();
    }
  }, [apiData]);
  const uploadImageHandler = (idName) => {
    document.getElementById(idName).click();
  };
  return (
    <div className="widjet_chatbot_flycatch_main-div">
      <div className="widjet_chatbot_flycatch_minimise-box">
        <div className="widjet_chatbot_flycatch_chat-text">
          <span className="widjet_chatbot_flycatch_chat-bot-icon">
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20.5"
                cy="20.5"
                r="20"
                fill="url(#pattern0)"
                stroke="#779CBF"
              />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use href="#image0_4630_38774" transform="scale(0.0133333)" />
                </pattern>
                <image
                  id="image0_4630_38774"
                  width="75"
                  height="75"
                  href="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </span>
          <div>
            <div className="widjet_chatbot_flycatch_chat-text-bold">
              {ChatBotConstants.CHAT}
            </div>
            <div className="widjet_chatbot_flycatch_online-txt">
              {" "}
              {loader ? ChatBotConstants.TYPING : ChatBotConstants.ONLINE}
            </div>
          </div>
        </div>
        <div
          className="widjet_chatbot_flycatch_close-button"
          onClick={() => {
            setActive(false);
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.00078 8.40078L2.10078 13.3008C1.91745 13.4841 1.68411 13.5758 1.40078 13.5758C1.11745 13.5758 0.884114 13.4841 0.700781 13.3008C0.517448 13.1174 0.425781 12.8841 0.425781 12.6008C0.425781 12.3174 0.517448 12.0841 0.700781 11.9008L5.60078 7.00078L0.700781 2.10078C0.517448 1.91745 0.425781 1.68411 0.425781 1.40078C0.425781 1.11745 0.517448 0.884114 0.700781 0.700781C0.884114 0.517448 1.11745 0.425781 1.40078 0.425781C1.68411 0.425781 1.91745 0.517448 2.10078 0.700781L7.00078 5.60078L11.9008 0.700781C12.0841 0.517448 12.3174 0.425781 12.6008 0.425781C12.8841 0.425781 13.1174 0.517448 13.3008 0.700781C13.4841 0.884114 13.5758 1.11745 13.5758 1.40078C13.5758 1.68411 13.4841 1.91745 13.3008 2.10078L8.40078 7.00078L13.3008 11.9008C13.4841 12.0841 13.5758 12.3174 13.5758 12.6008C13.5758 12.8841 13.4841 13.1174 13.3008 13.3008C13.1174 13.4841 12.8841 13.5758 12.6008 13.5758C12.3174 13.5758 12.0841 13.4841 11.9008 13.3008L7.00078 8.40078Z"
              fill="#1D1D1E"
            />
          </svg>
        </div>
      </div>
      <div className="widjet_chatbot_flycatch_chat-area" id="scrollTop">
        {arrayChat?.map((i, index) =>
          i.sender === "bot" ? (
            <div key={index} className="widjet_chatbot_flycatch_avatar-chat">
              <div className="widjet_chatbot_flycatch_avatar">
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="20.5"
                    cy="20.5"
                    r="20"
                    fill="url(#pattern0)"
                    stroke="#779CBF"
                  />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        href="#image0_4630_38774"
                        transform="scale(0.0133333)"
                      />
                    </pattern>
                    <image
                      id="image0_4630_38774"
                      width="75"
                      height="75"
                      href="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
              <div className="widjet_chatbot_flycatch_text">{i.message}</div>
            </div>
          ) : (
            <div className="widjet_chatbot_flycatch_receiver-div">
              <div className="widjet_chatbot_flycatch_chat-area-receiver">
                {i.message}
              </div>
            </div>
          )
        )}
        <div ref={elementRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="widjet_chatbot_flycatch_type-area">
          {/* {arrayChat.length === 5 && (
            <div>
              <input
                type="file"
                id="myFile"
                name="attachmentId"
                required
                className="widjet_chatbot_flycatch_image-upload"
                hidden="hidden"
                accept="image/*"
                onChange={(e) => {
                  setFileDataObj(Array.from(e.target.files));
                  setImageName(Array.from(e.target.files)[0].name);
                  setCheckPhoto(true);
                }}
                onClick={() => setCheckPhoto(true)}
              />
              <div className="widjet_chatbot_flycatch_upload-button-div">
                <button
                  type="button"
                  id="widjet_chatbot_flycatch_custom-button"
                  onClick={() => uploadImageHandler("myFile")}
                >
                  <div className="widjet_chatbot_flycatch_uplaod-img-icon">
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
              value={chat}
              name="chat"
              type={arrayChat.length === 1 ? "email" : "text"}
              id="email"
              onChange={(e) => {
                setChatData(e.target.value);
              }}
              onSubmit
            />

            <button
              className="widjet_chatbot_flycatch_button"
              type="submit"
              name="primary"
              onClick={() => {
                (validateEmail(chat) === true || arrayChat.length > 2) &&
                  handlesubmit();
              }}
            >
              <div className="widjet_chatbot_flycatch_send-message-icon">
                {chat ? (
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
          <div className="widjet_chatbot_flycatch_footer">
            <span className="widjet_chatbot_flycatch_footer-text-1">
              {" "}
              {ChatBotConstants.POWERED_BY}{" "}
            </span>
            <a
              href="https://www.flycatchtech.com/"
              className="widjet_chatbot_flycatch_text-decorator"
            >
              <span className="widjet_chatbot_flycatch_footer-text-2">
                {ChatBotConstants.FLYCATCH}
              </span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chatbox;
