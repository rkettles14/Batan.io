export default (io, socket) => {

  socket.emit('test_vuex', {vuex_test: 'hi from vuex'});

  socket.on('hello', (data) => {
    console.log(`Hello received from ${socket.decoded_token.sub}, ${socket.id}`)
  });

  io.emit('test_vuex', {vuex_test: 'IO EMIT'});
}
