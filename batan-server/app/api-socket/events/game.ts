import socketState from '../../state/socket';
import gameState from '../../state/game';

export default (io, socket) => {
  // Inform player of all games currently available:
  gameState.games.forEach((game) => {
    socket.emit('game/created', {
      game_id: game.game_id,
      game_name: game.game_name,
      num_players: game.players.size
    });
  });

  socket.on('game/newGame', (data) => {
    let newGame = gameState.newGame(socket.decoded_token.sub, data.game_name);
    console.log(newGame);
    io.emit('game/created', {
      game_id: newGame.game_id,
      game_name: newGame.game_name,
      num_players: newGame.players.size
    });  // event to inform lobby (every logged in user) of game's existence
    socket.emit('game/joined', {
      game_id: newGame.game_id,
      game_name: newGame.game_name
    }); // event to inform player they're in a game (no checks necessary since it is new)
  });

  socket.on('game/joinGame', (data) => {
    if (gameState.joinGame(socket.decoded_token.sub, data.game_id)) {
      let joinedGame = gameState.games.get(data.game_id);
      socket.emit('game/joined', {
        game_id: joinedGame.game_id,
        game_name: joinedGame.game_name
      });
      io.emit('game/created', {
        game_id: joinedGame.game_id,
        game_name: joinedGame.game_name,
        num_players: joinedGame.players.size
      });  // event to inform lobby (every logged in user) of game's existence
    } else {
      // failed to join game
    }
  });

}
