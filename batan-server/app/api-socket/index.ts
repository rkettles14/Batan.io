

export default (io, socket) => {
  // this socket is now authenticated, we can handle authenticated events
  // and access user's UID from socket.decoded_token.sub
  console.log(`From socket: ${socket.decoded_token.sub}`);
  socket.emit('test_vuex', {vuex_test: 'hi from vuex'})
  socket.on('hello', (data) => {
    console.log(`Hello received from ${socket.decoded_token.sub}`)
  })

  io.emit('test_vuex', {vuex_test: 'IO EMIT'})
}
