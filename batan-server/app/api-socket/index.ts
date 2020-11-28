import testEvents from './events/test';
import connectionEvents from './events/connection';
import gameEvents from './events/game';
import chatEvents from './events/chat';

export default (io, socket) => {
  // this socket is now authenticated, we can handle authenticated events
  // and access user's UID from socket.decoded_token.sub
  testEvents(io, socket);
  connectionEvents(io, socket);
  gameEvents(io, socket);
  chatEvents(io, socket);
}
