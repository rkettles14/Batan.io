import socketState from '../../state/socket';

export default (io, socket) => {
  socketState.addSocket(socket.decoded_token.sub, socket.id);

  socket.on('disconnect', (reason) => {
    socketState.rmSocket(socket.decoded_token.sub, socket.id);
  });

  socket.on('info/addNick', (nick) => {
    socketState.addNick(socket.decoded_token.sub, nick);
  });
}
