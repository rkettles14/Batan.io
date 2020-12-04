// Handles permissions, turns & multiple games & sockets per user
import Game from '../../engine/game';

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
      order: [],
      players: new Map(),
      gameObj: new Game
    });

    this.games.get(nextGameID).players.set(user_id, {
      order: 0
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
          order: game.players.size
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
  playRollDice(user_id, game_id) {
    /*
    * Player to roll dice if it is start of their turn
    */
  },
  playPurchaseRoad(user_id, game_id, location) {
    /*
    * Player to purchase a road at location if possible (determined by engine)
    */
  },
  playPurchaseSettlement(user_id, game_id, location) {
    /*
    * Player to purchase a settlement at location if possible (determined by engine)
    */
  },
  playPurchaseCity(user_id, game_id, location) {
    /*
    * Player to purchase a city at location if possible (determined by engine)
    */

  },
  playPurchaseDevCard(user_id, game_id) {
    /*
    * Player to purchase dev card if possible (determined by engine)
    */

  },
  playDevCard(user_id, game_id, devcard) {
    /*
    * Player to play devcard if possible (determined by engine)
    */

  },
  playEndTurn(user_id, game_id, end_turn_callback) {
    /*
    * Player ends their turn (if it is their turn)
    */
    let game = this.games.get(game_id);
    if (game.order[this.whosTurn(game_id)] === user_id) {
      this.nextTurn(game_id, game.turn_num, end_turn_callback);
      console.log("Ended turn!");
    } else {
      console.log("Not your turn!");
    }
  },
  nextTurn(game_id, expected_turn, callback) {
    /*
    * Sets current turn to next player if turn is expected_turn
    * This allows for turn timeouts to only incremement the turn if they trigger
    * before their turn is ended
    *
    * Calls callback with 'next turn' object
    */
    let game = this.games.get(game_id);
    if (game.turn_num === expected_turn) {
      game.turn_num += 1;

      let end_turn_time = new Date();
      end_turn_time.setSeconds(end_turn_time.getSeconds() + 180)

      setTimeout(() => {
        this.nextTurn(game_id, game.turn_num, callback);
      }, 180000);

      let turnStartData = {
        turn_type: "normal",
        current_player: this.whosTurn(game_id),
        turn_over_time: end_turn_time.toISOString()
      }

      if (game.turn_num < game.players.size*2) {
        turnStartData.turn_type = "init";
      }
      callback(turnStartData);
    }
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
