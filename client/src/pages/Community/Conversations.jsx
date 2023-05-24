// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";

// const Conversations = ({ data, currentUserId }) => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const userId = data.members.find((id) => id !== currentUserId);
//     console.log(userId);
//     const getUserData = async () => {
//         const {data} = await getUser(userId)
//     };
//   }, []);
//   return <div>conversations</div>;
// };

// export default Conversations;
