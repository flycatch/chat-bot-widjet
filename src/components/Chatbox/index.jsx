import React, { useEffect, useRef, useState } from "react";
import { env_var } from "../../config/env";
import { ChatBotConstants } from "../../constants";
import { post, put } from "../../service/apiServices";
import "./index.css";

const Chatbox = ({ setActive }) => {
  const [chat, setChatData] = useState("");
  const [checkPhoto, setCheckPhoto] = useState(false);
  const [imageName, setImageName] = useState("");

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
          email: arrayChat[1].message,
          title: arrayChat[3].message,
          description: arrayChat[5].message,
        });
      AlwaysScrollToBottom();
    }
  };

  const imageApi = async (ticket_id) => {
    const postData = await put(
      `${env_var.BASE_URL}/ticket/${ticket_id}/attach`,
      formDataConverter(fileDataObj)
    );
    return postData;
  };
  useEffect(() => {
    if (arrayChat.length === 6) {
      const postData = async () => {
        setloader(true);
        try {
          const ticketApi = await post(
            `${env_var.BASE_URL}/ticket/generic-ticket`,
            apiData
          );
          setloader(false);
          const array = arrayChat;
          array.push({
            sender: ChatBotConstants.BOT,
            message: `${ChatBotConstants.TICKET_NUMBER_RESPONSE} ${ticketApi.ticket_number}`,
          });
          setArrayChat([...array]);
          if (ticketApi.ticket_id && checkPhoto) {
            imageApi(ticketApi.ticket_id);
            return ticketApi;
          }
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
    <div className="main-div">
      <div className="minimise-box">
        <div className="chat-text">
          <span>
            <img className="chat-bot-icon" src="/assets/avatar.svg" alt="" />
          </span>
          <div>
            <div className="chat-text-bold">{ChatBotConstants.CHAT}</div>
            <div className="online-txt">
              {" "}
              {loader ? ChatBotConstants.TYPING : ChatBotConstants.ONLINE}
            </div>
          </div>
        </div>
        <div>
          <img
            className="close-button"
            src="/assets/close-button.svg"
            alt=""
            onClick={() => {
              setActive(false);
            }}
          ></img>
        </div>
      </div>
      <div className="chat-area" id="scrollTop">
        {arrayChat?.map((i, index) =>
          i.sender === "bot" ? (
            <span className="avatar-chat">
              <img className="avatar" src="/assets/avatar.svg" alt="avatar" />
              <div key={index} className="text">
                {i.message}
              </div>
            </span>
          ) : (
            <div className="receiver-div">
              <div className="chat-area-receiver">{i.message}</div>
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
        <div className="type-area">
          {arrayChat.length === 5 && (
            <div>
              <input
                type="file"
                id="myFile"
                name="filename"
                className="image-upload"
                hidden="hidden"
                accept="image/*"
                onChange={(e) => {
                  setFileDataObj(Array.from(e.target.files));
                  setImageName(Array.from(e.target.files)[0].name);
                  setCheckPhoto(true);
                }}
              />
              <div className="upload-button-div">
                <button
                  type="button"
                  id="custom-button"
                  onClick={() => uploadImageHandler("myFile")}
                >
                  <img
                    className="uplaod-img-icon"
                    src="/assets/upload-button.svg"
                    alt="icon"
                  ></img>
                  <span className="button-text form-scroll"> </span>
                </button>
                <span className="button-text-1">
                  {imageName ? imageName : ChatBotConstants.CHOOSE_A_FILE}
                </span>
              </div>
            </div>
          )}

          <div className="chat-area-with-button">
            <input
              className="input"
              placeholder={ChatBotConstants.TYPE_A_MESSAGE}
              value={chat}
              name="chat"
              type={"text"}
              onChange={(e) => {
                setChatData(e.target.value);
              }}
            ></input>
            <button
              className="button"
              type="submit"
              name="primary"
              onClick={() => {
                handlesubmit();
              }}
            >
              <img
                src={
                  chat ? "/assets/send-icon-red.svg" : "/assets/send-icon.svg"
                }
                alt=""
                className="sent-img"
              ></img>
            </button>
          </div>
          <div className="footer">
            <span className="footer-text-1"> Powered by </span>
            <a href="https://www.flycatchtech.com/" className="text-decorator">
              <span className="footer-text-2">Flycatch</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chatbox;
