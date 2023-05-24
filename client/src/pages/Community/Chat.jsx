import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useEffect } from "react";
import { useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  // const ROOT_CSS = {
  //   height: 600,
  //   width: 400,
  // };

  const sendMsg = async () => {
    if (currentMsg !== "") {
      const msgData = {
        room,
        author: username,
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", msgData);
      setMsgList((list) => [...list, msgData]);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("recieve_msg", (data) => {
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div>
      <div className="chat-header">
        <p className="mt-1">Live Chat</p>
      </div>
      <div
        className="chat-body "
        style={{ height: "70vh", overflowY: "scroll" }}
      >
        {msgList.map((msgContent) => {
          return (
            <div className="message">
              <ScrollToBottom>
                <div>
                  <div
                    className={`message-content d-flex ${
                      msgContent.author === username ? "text-start" : "text-end"
                    }`}
                  >
                    <p className="border border-2 reg py-3 px-2">
                      {msgContent.msg}
                      <p className=" mt-1" style={{ fontSize: "10px" }}>
                        {msgContent.time} {msgContent.author}
                      </p>
                    </p>
                  </div>
                  <div></div>
                </div>
              </ScrollToBottom>
            </div>
          );
        })}
      </div>
      <div className="chat-footer d-flex  ">
        <input
          type="text"
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button className="btn-primary" onClick={sendMsg}>
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
