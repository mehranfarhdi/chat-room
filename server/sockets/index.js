const User = require('./User');
const RSA = require("../Encryption/Rsa");
const bigInt = require('big-integer');



module.exports = (io) => {

  // Connection
  io.on('connection', (socket) => {

    // Send online user list
    socket.emit('get online user', User.getOnlineUser());

    let connectedUser = new User(socket.id, false);
    User.users.set(socket.id, connectedUser);

    // Login
    socket.on('login', async (fullName, publicKey, publicExponet) => {

      // Check user
      console.log(publicKey.toString());
      let isUsing = false;
      User.users.forEach((key) => {
        if (key.fullname == fullName) {
          isUsing = true;
        }
      });

      //encrypt massage
      const encrypted_message = await RSA.encrypt(bigInt("1112223334445556667778882224445555555555555555523123132131339522"), bigInt(publicKey.toString()),
          bigInt(publicExponet.toString()));
      console.log(encrypted_message);
      socket.emit('check user', isUsing, encrypted_message);

      // Add User
      if (User.users.has(socket.id) && !isUsing) {
        let currentUser = User.users.get(socket.id);
        currentUser.isLogin = true;
        currentUser.fullname = fullName;

        io.emit('new user', fullName);
      }

    });

    // Send message
    socket.on('send message', (message) => {

      socket.broadcast.emit('new message', message);
    });

    // Disconnect
    socket.on('disconnect', (reason) => {

      let currentUser = User.users.get(socket.id);
      if (currentUser.isLogin) {
        io.emit('exit user', currentUser.fullname);
      }

      User.users.delete(socket.id);
      // Send new online user list to all online user
      io.emit('get online user', User.getOnlineUser());
    });

  });
}
