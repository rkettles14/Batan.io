// Handles permissions, turns & multiple games & sockets per user
import Game from '../../engine/game';
import socketState from './socket';
import { vertexStatus, player, resourceType, developmentType, harborType } from '../../engine/enums';


let nextGameID = 0;  // TODO: Needs to come from db so new server start doesn't reset old games

export default {
  players: new Map(),
  games: new Map(),
  newGame(user_id, game_name) {
    /*
    * Creates a new game owned by user_id
    */
    this.games.set(nextGameID, {
      game_id: nextGameID,
      game_name: game_name,
      game_owner: user_id,
      started: false,
      turn_timeout_length: 180000,
      skip_if_dc: false,
      turn_num: -1,
      turn_phase: "roll",
      dice: 0,
      end_turn_time: null,
      order: [],
      id: {
        id_sub: new Map(),
        sub_id: new Map(),
        id_ctr: 0
      },
      players: new Map(),
      gameObj: new Game
    });

    this.games.get(nextGameID).players.set(user_id, {
      color: 0
    });

    if (this.players.has(user_id)){
      this.players.get(user_id).push(nextGameID);
    } else {
      this.players.set(user_id, [nextGameID]);
    }
    let game = this.games.get(nextGameID);
    game.id.id_sub.set(++game.id.id_ctr, user_id);
    game.id.sub_id.set(user_id, game.id.id_ctr);

    return this.games.get(nextGameID++);
  },
  joinGame(user_id, game_id) {
    /*
    * Adds user_id to game game_id if a spot is available & game has not started
    */
    if (this.games.has(game_id)) {
      let game = this.games.get(game_id);
      if (!game.started && game.players.size < 4 && !game.players.has(user_id)) {
        game.players.set(user_id, {
          color: game.players.size
        });
        if (this.players.has(user_id)){
          this.players.get(user_id).push(game.game_id);
        } else {
          this.players.set(user_id, [game.game_id]);
        }
        game.id.id_sub.set(++game.id.id_ctr, user_id);
        game.id.sub_id.set(user_id, game.id.id_ctr);
        return true;
      } else {
        return false; // could not add player to game (too many players, game started or player already in game)
      }
    } else {
      return false; // game does not exist
    }
  },
  adminSetTimeout(user_id, game_id, timeout_s) {
    /*
    * Set timeout to timeout_s (seconds)
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if (game.game_owner === user_id) {
      game.turn_timeout_length = timeout_s * 1000;
      return true;
    } else {
      console.log("You are not owner of this game");
    }
    return false;
  },
  adminBootPlayer(user_id, game_id, bootee) {
    /*
    * Boot player from game (before or after start, but slightly different behaviour)
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if (game.game_owner === user_id && game.id.id_sub.has(bootee)) {

      if (!game.started) {
        let bootee_sub = game.id.id_sub.get(bootee);
        game.players.delete(bootee_sub);
        if (this.players.has(user_id)){
          this.players.get(user_id).splice(this.players.get(user_id).indexOf(game.game_id), 1);
        }
        game.id.id_sub.delete(bootee);
        game.id.sub_id.delete(bootee_sub);
      } else {
        // TODO: -- Need to verify many other things for this..
        return false;
      }

      return true;
    } else {
      console.log("You are not owner of this game");
    }
    return false;

  },
  adminSetSkipDC(user_id, game_id, skip_disconnected_players: boolean) {
    /*
    * Set skip on disconnect
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if (game.game_owner === user_id) {
      game.skip_if_dc = skip_disconnected_players;
      return true;
    } else {
      console.log("You are not owner of this game");
    }
    return false;

  },
  adminStartGame(user_id, game_id) {
    /*
    * Set started to true; shuffle players & begin initial placement before turns
    */
    if (this.games.has(game_id)) {
      let game = this.games.get(game_id);
      if (game.game_owner === user_id && !game.started && game.players.size <= 4 && game.players.size >= 1 ) {

        // shuffle function lifted from: https://javascript.info/task/shuffle
        function shuffle(array) {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        }

        game.started = true;
        game.order = Array.from(game.players.keys());
        shuffle(game.order);
        return true;
      } else {
        console.log("not your game to start, game is owned by " + game.game_owner + " and you are " + user_id);
        return false;
      }
    } else {
      console.log("No game to start");
      return false;
    }
  },
  chColor(user_id, game_id, color) {
    /* (non-critical)
    *  If game_id has not started, set user_id to color if available
    */

  },
  playInitPlacement(user_id, game_id, settlement, road) {
    /*
    * Player to place settlement & road (for game setup)
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        let player_num = this.whosTurn(game_id);
        if (game.turn_num < game.order.length) {
          // First round of placement -- player should have 1 settlement + 1 road max
          if (game.gameObj.players[this.whosTurn(game_id)].settlementsPlayed < 1 && game.gameObj.players[this.whosTurn(game_id)].roadsPlayed < 1) {
            if (settlement == road.start || settlement == road.end) {
              // TODO: Still uncaught edge cases, but very unlikely through boardgame interface
              if (game.gameObj.addSettlementInSetup(settlement, player_num + 1)) {
                if (game.gameObj.addRoadInSetup(road.start, road.end, player_num + 1)) {
                  this.calcVic(game_id);
                  return true;
                }
              }
            }
          } else {
            console.log("Too many settlements/roads placed already");
          }
        } else if (game.turn_num < game.order.length*2) {
          // 2nd round of placement -- player should have 2 settlement + 2 road max
          if (game.gameObj.players[this.whosTurn(game_id)].settlementsPlayed < 2 && game.gameObj.players[this.whosTurn(game_id)].roadsPlayed < 2) {
            if (settlement == road.start || settlement == road.end) {
              // TODO: Still uncaught edge cases, but very unlikely through boardgame interface
              if (game.gameObj.addSettlementInSetup(settlement, player_num + 1)) {
                if (game.gameObj.addRoadInSetup(road.start, road.end, player_num + 1)) {
                  this.calcVic(game_id);
                  return true;
                }
              }
            }
          } else {
            console.log("Too many settlements/roads placed already");
          }
        }
      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
    return false;
  },
  playRollDice(user_id, game_id) {
    /*
    * Player to roll dice if it is start of their turn
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "roll") {
        game.dice = game.gameObj.beginTurn();
        if (game.dice == 7) {
          game.turn_phase = "robber";
        } else {
          game.turn_phase = "build";
        }
        return true;
      } else {
        console.log("Not in roll phase, actually in phase " + game.turn_phase);
      }
    } else {
      console.log("Not your turn, it is player " + game.order[this.whosTurn(game_id)] + " turn and you are " + user_id);
    }
    return false;
  },
  playPurchaseRoad(user_id, game_id, start, end) {
    /*
    * Player to purchase a road at location if possible (determined by engine)
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        let ret = game.gameObj.purchaseRoad(start, end, this.whosTurn(game_id) + 1);
        if (ret.success) {
          this.calcVic(game_id);
          return true;
        } else {
          console.log(ret.reason);
          return false;
        }
      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
    return false;
  },
  playPurchaseSettlement(user_id, game_id, location) {
    /*
    * Player to purchase a settlement at location if possible (determined by engine)
    */
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        let ret = game.gameObj.purchaseSettlement(location, this.whosTurn(game_id) + 1);
        if (ret.success) {
          this.calcVic(game_id);
          return true;
        } else {
          console.log(ret.reason);
          return false;
        }
      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
    return false;
  },
  playPurchaseCity(user_id, game_id, location) {
    /*
    * Player to purchase a city at location if possible (determined by engine)
    */
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        let ret = game.gameObj.purchaseCity(location, this.whosTurn(game_id) + 1);
        if (ret.success) {
          this.calcVic(game_id);
          return true;
        } else {
          console.log(ret.reason);
          return false;
        }
      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
    return false;
  },
  playPurchaseDevCard(user_id, game_id) {
    /*
    * Player to purchase dev card if possible (determined by engine)
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        let ret = game.gameObj.purchaseDevelopmentCard(this.whosTurn(game_id) + 1);
        if (ret.success) {
            this.calcVic(game_id);
            return true;
        } else {
          console.log(ret.reason);
          return false;
        }
      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
    return false;
  },
  playDevCard(user_id, game_id, devcard: developmentType, extra) {
    /*
    * Player to play devcard if possible (determined by engine)
    * extra is an object containing more info depending on devcard type.
    * Should only need 1 additional option per dev card.
    * define the others as undefined, or don't include them
      {
        destinationHexId?: number,
        monopolyResource?: resourceType,
        targetVertices?: number[],
        yearOfPlentyResources?: resourceType[]
      }
    */
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        // game.gameObj.playDevelopmentCard(this.whosTurn(game_id) + 1, devCard,
        //       destinationHexId?: number, monopolyResource?: resourceType,
        //       targetVertices?: number[], yearOfPlentyResources?: resourceType[] );
        let ret = game.gameObj.playDevelopmentCard(
          this.whosTurn(game_id) + 1,
          devcard,
          extra.destinationHexId,
          extra.monopolyResource,
          extra.targetVertices,
          extra.yearOfPlentyResources
        );
        if (ret.success) {
            this.calcVic(game_id);
            return true;
        } else {
          console.log(ret.reason);
          return false;
        }
      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
  },
  playTradeWithBank(user_id, game_id, to_bank: resourceType, from_bank: resourceType) {
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        let ret = game.gameObj.tradeWithBank(this.whosTurn(game_id) + 1, to_bank, from_bank);
        if (ret.success) {
            return true;
        } else {
          console.log(ret.reason);
          return false;
        }
      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
    return false;
  },
  playMoveRobber(user_id, game_id, location) {
    /*
    * Player to move robber & steal a card
    */
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "robber") {
        let ret = game.gameObj.moveRobberAndSteal(this.whosTurn(game_id) + 1, location);
        if (ret.success) {
          game.turn_phase = "build";
          return true;
        } else {
          console.log(ret.reason);
          return false;
        }
      } else {
        console.log("Not in robber phase");
      }
    } else {
      console.log("Not your turn");
    }
    return false;
  },
  playEndTurn(user_id, game_id, callback) {
    /*
    * Player ends their turn (if it is their turn && they are in build phase)
    */
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        this.nextTurn(game_id, game.turn_num, callback);
        return true;
      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
    return false;
  },
  nextTurn(game_id, expected_turn, callback) {
    /*
    * Sets current turn to next player if turn is expected_turn
    * This allows for turn timeouts to only incremement the turn if they trigger
    * before their turn is ended
    */
    if (!this.games.has(game_id)) {
      return;
    }

    let game = this.games.get(game_id);
    if (game.turn_num === expected_turn) {
      if (game.turn_num >= 0) {
        this.calcVic(game_id);
        if (game.gameObj.winner !== 0) {
          this.endGame(game_id);
        }
      }

      if (game.skip_if_dc) {
        let players_online = [];
        for (player of game.order) {
          players_online.push(socketState.online.has(player));
        }
        let original_turn_num = game.turn_num;
        // cycle through all players at most twice until first online player found (need twice in case player goes offline during setup)
        game.turn_num += 1;
        while (!players_online[this.whosTurn(game_id)] && game.turn_num - original_turn_num <= game.order.length*2) {
          game.turn_num += 1;
        }
      } else {
        game.turn_num += 1;
      }

      if (game.turn_num < game.order.length*2) {
        console.log("In build phase because next turn");
        game.turn_phase = "build";
      } else {
        game.turn_phase = "roll";
        game.dice = 0;
      }

      let end_turn_time = new Date();
      end_turn_time.setSeconds(end_turn_time.getSeconds() + game.turn_timeout_length/1000)
      let curr_turn = game.turn_num;
      setTimeout(() => {
        this.nextTurn(game_id, curr_turn, callback);
      }, game.turn_timeout_length);

      game.end_turn_time = end_turn_time.toISOString();
      callback();
    }
  },
  calcVic(game_id){
    if (!this.games.has(game_id)) {
      return;
    }
    let game = this.games.get(game_id);
    for (let i = 1; i <= game.players.size; i++) {
      game.gameObj.calculateVictoryPoints(i);
    }
  },
  get_full_game_info(game_id){
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);

    let scores = []
    for (let player_num in game.order) {
      let player = game.gameObj.players[player_num];
      let dc = player.developmentCards;
      let p_scores = {
        name: player.name,
        nick: {
          alias: game.id.sub_id.get(game.order[player_num]),
          name: socketState.nicks.get(game.order[player_num])
        },
        victoryPoints: player.victoryPoints,
        developmentCards: dc.knight + dc.victoryPointCard + dc.roadBuilder + dc.yearOfPlenty + dc.monopoly,
        settlementsPlayed: player.settlementsPlayed,
        citiesPlayed: player.citiesPlayed,
        roadsPlayed: player.roadsPlayed,
        longestRoad: player.longestRoad,
        armies: player.armies,
        vpDevCardsPlayed: player.vpDevCardsPlayed
      }
      scores.push(p_scores);
    }

    let dc = game.gameObj.bank.developmentCards;
    let turnStartData = {
      game_id: game_id,
      winner: game.gameObj.winner,
      settings: {
        turn_timeout_length: game.turn_timeout_length,
        skip_offline_players: game.skip_if_dc
      },
      turn: {
        type: "normal",
        player: this.whosTurn(game_id) + 1,
        over_at: game.end_turn_time,
        phase: game.turn_phase,
        dice: game.dice
      },
      board: JSON.stringify(game.gameObj.board, game.gameObj.replacer),
      score: scores,
      bank: {
        resources: JSON.stringify(game.gameObj.bank.resources, game.gameObj.replacer),
        developmentCards: dc.knight + dc.victoryPointCard + dc.roadBuilder + dc.yearOfPlenty + dc.monopoly
      }
    }

    if (game.turn_num < game.players.size*2) {
      turnStartData.turn.type = "init";
    }
    return turnStartData;
  },
  get_player_info(game_id, player_num) {
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    let player = game.gameObj.players[player_num];
    return {
      ...player,
      nick: {
        alias: game.id.sub_id.get(game.order[player_num]),
        name: socketState.nicks.get(game.order[player_num])
      },
      sequence_num: player_num + 1
    }
  },
  get_status(game_id) {
    return "active" // TODO: return something useful..
  },
  get_owner_sequence_num(game_id) {
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    return game.order.indexOf(game.game_owner) + 1;
  },
  whosTurn(game_id) {
    /*
    * Returns the uid of the player who's turn it is currently in game_id
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if (game.turn_num < game.players.size*2) {
      // in init stage (fwd, then backward)
      let player_num = game.turn_num % game.players.size;
      if (game.turn_num >= game.players.size) {
        player_num = game.players.size - player_num - 1;
      }
      return player_num;
    } else {
      // normal turn
      return game.turn_num % game.players.size;
    }
  },
  endGame(game_id){
    /*
    * Save results to database,
    * alert players game no longer active,
    */
  },
  cleanUp(game_id) {
    /*
    * rm from player's active games list
    * rm from global available games list
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    Array.from(game.players.keys()).forEach((sub) => {
      this.players.get(sub).splice(this.players.get(sub).indexOf(game_id), 1);
    })
    this.games.delete(game_id);
  },
  cheat_get_cards(user_id, game_id, cards) {
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    let cheater = game.order.indexOf(user_id);
    game.gameObj.players[cheater].resources.sheep += cards.sheep;
    game.gameObj.players[cheater].resources.wheat += cards.wheat;
    game.gameObj.players[cheater].resources.wood += cards.wood;
    game.gameObj.players[cheater].resources.ore += cards.ore;
    game.gameObj.players[cheater].resources.brick += cards.brick;
    return true;
  }

}
