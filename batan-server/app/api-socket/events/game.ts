import socketState from '../../state/socket';
import gameState from '../../state/game';

function update_game_clients(io, game_id, event, data) {
  let game = gameState.games.get(game_id);
  game.players.forEach((player_info, uid) => {
    socketState.online.get(uid).forEach((socketid) => {
      io.to(socketid).emit(event, data);
    });
  });
}

function send_active_game(io, game_id) {
  let game = gameState.games.get(game_id);
  let game_full_info = gameState.get_full_game_info(game_id);

  game.players.forEach((player_info, uid) => {
    let player_info = gameState.get_player_info(game_id, game.order.indexOf(uid));
    socketState.online.get(uid).forEach((socketid) => {
      io.to(socketid).emit('game/activeGame', {
        game_id: game_id,
        game_name: game.game_name,
        game_info: game_full_info,
        player_info: player_info
      });
    });
  });
}

export default (io, socket) => {
  // Inform player of all games currently available globally..
  gameState.games.forEach((game) => {
    socket.emit('game/created', {
      game_id: game.game_id,
      game_name: game.game_name,
      num_players: game.players.size
    });
  });

  // Send all active games that user is a part of..
  if (gameState.players.has(socket.decoded_token.sub)) {
    gameState.players.get(socket.decoded_token.sub).forEach((game_id) => {
      send_active_game(io, game_id);
    });
  }

  socket.on('game/newGame', (data) => {
    let newGame = gameState.newGame(socket.decoded_token.sub, data.game_name);
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
      });  // overwrite prev. game of this id client-side
    } else {
      socket.emit('game/actionFailed', {description: "Failed to join game"})
    }
  });

  socket.on('game/startGame', (data) => {
    if (gameState.adminStartGame(socket.decoded_token.sub, data.game_id)) {
      gameState.nextTurn(data.game_id, -1, send_active_game.bind(null, io, data.game_id));
    } else {
      socket.emit('game/actionFailed', {description: "Failed to start game"})
    }
  });

  socket.on('game/endTurn', (data) => {
    if (!gameState.playEndTurn(socket.decoded_token.sub, data.game_id, send_active_game.bind(null, io, data.game_id))) {
        socket.emit('game/actionFailed', {description: "It's not your turn!"})
      }
  });




}
