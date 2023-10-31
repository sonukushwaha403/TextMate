// export default function (socket) {
//   //user joins or opens the application
//   socket.on("join", (user) => {
//     console.log("user has joined : ",user);
//         socket.join(user);
//   });

//   //join a conversation room
//   socket.on("join conversation", (conversation) => {
//     socket.join(conversation);
//     console.log("user has joined conversation : ",conversation);
//   });

//   //send and receive messsage

//   socket.on("send message",(message) => {
//     let conversation = message.conversation;
//     if(!conversation.users) return;
//     conversation.users.forEach((user) =>{
//       if(user._id===message.sender._id) return;
//       socket.in(user._id).emit("receive message", message);
//     });
//   });

// }






let onlineUsers = [];
export default function (socket, io) {
  //user joins or opens the application
  socket.on("join", (user) => {
    socket.join(user);
    //add joined user to online users
    if (!onlineUsers.some((u) => u.userId === user)) {
    // console.log(`user ${user} is now online.`);            
      onlineUsers.push({ userId: user, socketId: socket.id });
    }
    //send online users to frontend
    io.emit("get-online-users", onlineUsers);
    //send socket id
    io.emit("setup socket", socket.id);
  });

  //socket disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
   // console.log("user is diconnected");
    io.emit("get-online-users", onlineUsers);
  });

  //join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
  });

  //send and receive message
  socket.on("send message", (message) => {
    // console.log("new message received",message);
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("receive message", message);
    });
  });

  //typing
  socket.on("typing", (conversation) => {
    // console.log("typing...");
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    // console.log("stop typing...");
    socket.in(conversation).emit("stop typing");
  });

  //call
  //---call user
  socket.on("call user", (data) => {
    let userId = data.userToCall;
    let userSocketId = onlineUsers.find((user) => user.userId == userId);
    io.to(userSocketId.socketId).emit("call user", {
      signal: data.signal,
      from: data.from,
      name: data.name,
      picture: data.picture,
    });
  });
  //---answer call
  socket.on("answer call", (data) => {
    io.to(data.to).emit("call accepted", data.signal);
  });

  //---end call
  socket.on("end call", (id) => {
    io.to(id).emit("end call");
  });
}
