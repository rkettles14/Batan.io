import socketState from '../../state/socket';

export default (io, socket) => {
  socketState.addSocket(socket.decoded_token.sub, socket.id);
  // console.log(socketState.online);

  socket.on('disconnect', (reason) => {
    socketState.rmSocket(socket.decoded_token.sub, socket.id);
    // console.log(socketState.online);
  });
}
