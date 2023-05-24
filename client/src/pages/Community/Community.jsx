import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { userChats } from "../../api/ChatReq";
import Chat from "./Chat";
import Conversations from "./Conversations";

const socket = io.connect("http://localhost:5000");
const Community = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [username, setUserName] = useState(`${user.username}`);
  const [room, setRoom] = useState("fostercenter");
  const joinToRoom = () => {
    socket.emit("join_room", room);
  };
  // const user = JSON.parse(localStorage.getItem("currentUser"));
  // const [cahts, setChats] = useState([]);

  // useEffect(() => {
  //   const getChats = async () => {
  //     const { data } = await userChats(user._id);
  //     setChats(data);
  //     console.log(data);
  //   };

  //   getChats();
  // }, []);
  return (
    <div>
      <div className="container">
        <div className="row mt-5 border border-2" style={{ height: "80vh" }}>
          <div className="col-md-4 border border-1 chat-window">
            <div>
              <h4 className="my-1">
                <center>Join A Chat</center>
              </h4>
            </div>
            <div>
              <input
                type="text"
                className=" p-1 m-1 "
                placeholder={user?.username}
                value={username}
              />
              <input
                type="text"
                className="text-capitalize p-1 m-1 "
                placeholder="chatroom"
                value={room}
              />
              <button className="m-1 btn-primary " onClick={joinToRoom}>
                Join Chat
              </button>
            </div>
          </div>
          <div className="col-md-6 border border-1">
            <div style={{ overFlow: "scroll" }}>
              <Chat socket={socket} username={user?.username} room={room} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

// <div className="container">
//   <div className="row">
//     <div className="col-md-4">
//       <h2>ChatAPP</h2>
//       <div className="chat-container">
//         <h2>Chat</h2>
//         <div className="chat-list">
//           {cahts?.map((chat) => (
//             <div>
//               <Conversations data={chat} currentUserId={user._id} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     <div className="col-md-8">
//       <p>right</p>
//     </div>
//   </div>
// </div>
