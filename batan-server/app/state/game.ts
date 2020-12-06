// Handles permissions, turns & multiple games & sockets per user
import Game from '../../engine/game';
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
      turn_num: -1,
      turn_phase: "roll",
      end_turn_time: null,
      order: [],
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
        return true;
      } else {
        return false; // could not add player to game (too many players, game started or player already in game)
      }
    } else {
      return false; // game does not exist
    }
  },
  adminBootPlayer(user_id, game_id, playerIdToBoot) {
    /*
    * Remove a player from unstarted game, or set to skip their turn if game started
    */

  },
  adminSetGameRules(user_id, game_id, rule, args) {
    /*
    * If user_id is a game_id administrator, allow them to set a rule for game_id
    *   - Set offline players mode to 'skip turn'
    *   - Remove player from game
    *   - Set resources for the game (future)
    *   - etc.
    */
  },
  adminStartGame(user_id, game_id) {
    /*
    * Set started to true; shuffle players & begin initial placement before turns
    */
    if (this.games.has(game_id)) {
      let game = this.games.get(game_id);
      if (game.game_owner === user_id && !game.started && game.players.size <= 4 && game.players.size >= 2 ) {

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
        return false;
      }
    } else {
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
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        let player_num = this.whosTurn(game_id);
        if (game.turn_num < game.order.length) {
          // First round of placement -- player should have 1 settlement + 1 road max
          if (game.gameObj.players[this.whosTurn(game_id)].settlementsPlayed < 1 && game.gameObj.players[this.whosTurn(game_id)].roadsPlayed < 1) {
            // place settlement first.. hacky workaround since players don't have resources to buy things yet..
            game.gameObj.board.addSettlement(settlement, player_num);
            game.gameObj.players[player_num].settlementsPlayed++;
            game.gameObj.board.addRoad(road.start, road.end, player_num);
            game.gameObj.players[player_num].roadsPlayed++;
            game.gameObj.players[player_num].victoryPoints++;
            return true;
          } else {
            console.log("Too many settlements/roads placed already");
          }
        } else if (game.turn_num < game.order.length*2) {
          // 2nd round of placement -- player should have 2 settlement + 2 road max
          if (game.gameObj.players[this.whosTurn(game_id)].settlementsPlayed < 2 && game.gameObj.players[this.whosTurn(game_id)].roadsPlayed < 2) {
            // place settlement first.. hacky workaround since players don't have resources to buy things yet..
            game.gameObj.board.addSettlement(settlement, player_num);
            game.gameObj.players[player_num].settlementsPlayed++;
            game.gameObj.board.addRoad(road.start, road.end, player_num);
            game.gameObj.players[player_num].roadsPlayed++;
            game.gameObj.players[player_num].victoryPoints++;
            return true;
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
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "roll") {
        // Roll dice & return dice roll info + effects to all users..

        game.turn_phase = "build";
      } else {
        console.log("Not in roll phase");
      }
    } else {
      console.log("Not your turn");
    }

  },
  playPurchaseRoad(user_id, game_id, location) {
    /*
    * Player to purchase a road at location if possible (determined by engine)
    */
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        // Do stuff

      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }

  },
  playPurchaseSettlement(user_id, game_id, location) {
    /*
    * Player to purchase a settlement at location if possible (determined by engine)
    */

    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        // Do stuff

      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
  },
  playPurchaseCity(user_id, game_id, location) {
    /*
    * Player to purchase a city at location if possible (determined by engine)
    */
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        // Do stuff

      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }

  },
  playPurchaseDevCard(user_id, game_id) {
    /*
    * Player to purchase dev card if possible (determined by engine)
    */
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        // Do stuff

      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
  },
  playDevCard(user_id, game_id, devcard) {
    /*
    * Player to play devcard if possible (determined by engine)
    */
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      if (game.turn_phase === "build") {
        // Do stuff

      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
  },
  playEndTurn(user_id, game_id, callback) {
    /*
    * Player ends their turn (if it is their turn && they are in build phase)
    */
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
    let game = this.games.get(game_id);
    if (game.turn_num === expected_turn) {
      game.turn_num += 1;

      if (game.turn_num < game.order.length*2) {
        game.turn_phase = "build";
      } else {
        game.turn_phase = "roll";
      }

      let end_turn_time = new Date();
      end_turn_time.setSeconds(end_turn_time.getSeconds() + 180)

      setTimeout(() => {
        this.nextTurn(game_id, game.turn_num, callback);
      }, 180000);

      game.end_turn_time = end_turn_time.toISOString();
      callback();
    }
  },
  get_full_game_info(game_id){
    let game = this.games.get(game_id);

    let scores = []
    for (let player_num in game.order) {
      let player = game.gameObj.players[player_num];
      let dc = player.developmentCards;
      let p_scores = {
        name: player.name,
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
      turn: {
        type: "normal",
        player: this.whosTurn(game_id),
        over_at: game.end_turn_time,
        phase: game.turn_phase
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
    let game = this.games.get(game_id);
    let player = game.gameObj.players[player_num];
    return {
      ...player,
      sequence_num: player_num
    }
  },
  get_status(game_id) {
    return "active" // TODO: return something useful..
  },
  get_owner_sequence_num(game_id) {
    let game = this.games.get(game_id);
    return game.order.indexOf(game.game_owner);
  },
  whosTurn(game_id) {
    /*
    * Returns the uid of the player who's turn it is currently in game_id
    */
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
    * rm from player's active games list
    * rm from global available games list
    */

  }

}
