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

function send_created_game(io, game_id) {
  let game = gameState.games.get(game_id);
  let nicks = []
  for (let sub of Array.from(game.id.sub_id.keys())) {
    nicks.push({
      alias: game.id.sub_id.get(sub),
      name: socketState.nicks.get(sub)
    });
  }
  socketState.online.forEach((player_info, uid) => {
    let is_owner = (game.game_owner === uid);
    let is_joined = Array.from(game.players.keys()).includes(uid);
    if (socketState.online.has(uid)) {
      socketState.online.get(uid).forEach((socketid) => {
        io.to(socketid).emit('game/created', {
          game_id: game.game_id,
          game_name: game.game_name,
          owner: is_owner,
          joined: is_joined,
          nicks: nicks,
          num_players: game.players.size,
          started: game.started
        });
      });
    }
  });
}

function send_active_game(io, game_id) {
  let game = gameState.games.get(game_id);
  let game_full_info = gameState.get_full_game_info(game_id);
  let game_status = gameState.get_status(game_id);
  let game_owner = gameState.get_owner_sequence_num(game_id);

  game.players.forEach((player_info, uid) => {
    let player_info = gameState.get_player_info(game_id, game.order.indexOf(uid));
    let alert = false;
    if (gameState.whosTurn(game_id) + 1 === player_info.name) {
      alert = true;
    }
    if (socketState.online.has(uid)) {
      socketState.online.get(uid).forEach((socketid) => {
        io.to(socketid).emit('game/activeGame', {
          game_id: game_id,
          game_name: game.game_name,
          status: game_status,
          owner: game_owner,
          game_info: game_full_info,
          player_info: player_info,
          alerts: alert
        });
      });
    }
  });
}

export default (io, socket) => {
  // Inform player of all games currently available globally..
  gameState.games.forEach((game) => {
    send_created_game(io, game.game_id);
  });

  // Send all active games that user is a part of..
  if (gameState.players.has(socket.decoded_token.sub)) {
    gameState.players.get(socket.decoded_token.sub).forEach((game_id) => {
      send_active_game(io, game_id);
    });
  }

  socket.on('game/newGame', (data) => {
    let newGame = gameState.newGame(socket.decoded_token.sub, data.game_name);
    send_created_game(io, newGame.game_id);
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
      send_created_game(io, joinedGame.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "Failed to join game"})
    }
  });

  socket.on('game/startGame', (data) => {
    if (gameState.adminStartGame(socket.decoded_token.sub, data.game_id)) {
      send_created_game(io, data.game_id); // update all that game has started..
      gameState.nextTurn(data.game_id, -1, send_active_game.bind(null, io, data.game_id));
    } else {
      socket.emit('game/actionFailed', {description: "Failed to start game"})
    }
  });

  socket.on('game/playInitPlacement', (data) => {
    /*
    *
    * data.settlement : number (vertex to attempt to place settlement)
    * data.road : {
    *     start: Number (this.roadStartVert),
    *     end: Number (this.roadEndVert)
    * }
    */
    if (gameState.playInitPlacement(socket.decoded_token.sub, data.game_id, data.settlement, data.road)) {
      send_active_game(io, data.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "Couldn't place settlement.. reason unknown for now"})
    }
  });

  socket.on('game/rollDice', (data) => {
    /*
    * trigger roll dice event. Rolled dice value updated in active_games
    */
    if (gameState.playRollDice(socket.decoded_token.sub, data.game_id)) {
      send_active_game(io, data.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "Couldn't roll dice.. reason unknown for now"})
    }
  });

  socket.on('game/moveRobber', (data) => {
    /*
    *
    * data.location : number (hexId of location to move robber to)
    */
    if (gameState.playMoveRobber(socket.decoded_token.sub, data.game_id, data.location)) {
      send_active_game(io, data.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "Couldn't move robber.. reason unknown for now"})
    }
  });

  socket.on('game/buySettlement', (data) => {
    /*
    * game/buySettlement
    */
    if (gameState.playPurchaseSettlement(socket.decoded_token.sub, data.game_id, data.location)) {
      send_active_game(io, data.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "Unknown failure game/buySettlement"});
    }
  });

  socket.on('game/buyCity', (data) => {
    /*
    * game/buyCity
    */
    if (gameState.playPurchaseCity (socket.decoded_token.sub, data.game_id, data.location)) {
      send_active_game(io, data.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "Unknown failure game/buyCity"});
    }
  });

  socket.on('game/buyRoad', (data) => {
    /*
    * game/buyRoad
    */
    if (gameState.playPurchaseRoad (socket.decoded_token.sub, data.game_id, data.start, data.end)) {
      send_active_game(io, data.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "Unknown failure game/buyRoad"});
    }
  });

  socket.on('game/buyDevCard', (data) => {
    /*
    * game/buyDevCard
    */
    if (gameState.playPurchaseDevCard (socket.decoded_token.sub, data.game_id)) {
      send_active_game(io, data.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "Unknown failure game/buyDevCard"});
    }
  });

  socket.on('game/tradeBank', (data) => {
    /*
    * to_bank & from_bank are resourceType enum
    */
    if (gameState.playTradeWithBank(socket.decoded_token.sub, data.game_id, data.to_bank, data.from_bank)) {
      send_active_game(io, data.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "tradeBank failed"});
    }
  });

  socket.on('game/playDevCard', (data) => {
    /*
    * extra is an object containing more info. Should only need 1 per dev card, define the others as undefined, or don't include them
      {
        destinationHexId?: number,
        monopolyResource?: resourceType,
        targetVertices?: number[],
        yearOfPlentyResources?: resourceType[]
      }
    */
    if (gameState.playDevCard(socket.decoded_token.sub, data.game_id, data.devCard, data.extra)
    )
      {
      send_active_game(io, data.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "tradeBank failed"});
    }
  });




  socket.on('game/endTurn', (data) => {
    if (!gameState.playEndTurn(socket.decoded_token.sub, data.game_id, send_active_game.bind(null, io, data.game_id))) {
        socket.emit('game/actionFailed', {description: "It's not your turn!"})
      }
  });

  socket.on('game/admin/settimeout', (data) => {
    if (gameState.adminSetTimeout(socket.decoded_token.sub, data.game_id, data.timeout)) {
      socket.emit('game/admin/timeout_set');
    } else {
      socket.emit('game/actionFailed', {description: "Setting timeout failed"});
    }
  });

  socket.on('game/admin/setSkipIfOffline', (data) => {
    if (gameState.adminSetSkipDC(socket.decoded_token.sub, data.game_id, data.skip)) {
      socket.emit('game/admin/skip_offline_set');
    } else {
      socket.emit('game/actionFailed', {description: "Setting skip offline players failed"});
    }
  });

  socket.on('game/admin/boot', (data) => {
    if (gameState.adminBootPlayer(socket.decoded_token.sub, data.game_id, data.bootee)) {
      if (gameState.games.get(data.game_id).started) {
        send_active_game(io, data.game_id);   // in case game is started already
      } else {
        send_created_game(io, data.game_id);  // in case game not started
      }
      socket.emit('game/admin/player_booted');
    } else {
      socket.emit('game/actionFailed', {description: "Booting player failed"});
    }
  })

  // TODO: Wrap in env flag -- only available in dev
  socket.on('game/cheat', (data) => {
    if (gameState.cheat_get_cards(socket.decoded_token.sub, data.game_id, data.cards)) {
      send_active_game(io, data.game_id);
    } else {
      socket.emit('game/actionFailed', {description: "cheating failed"});
    }
  });

}
