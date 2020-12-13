// Handles permissions, turns & multiple games & sockets per user
import Game from '../../engine/game';
import Player from '../../engine/game';
import socketState from './socket';
import { vertexStatus, player, resourceType, developmentType, harborType } from '../../engine/enums';
import { connectAndDo } from '../database/'
import { IGame } from '../database/users.types'
import { UserModel } from '../database/users.model';


let nextGameID = 0;  // TODO: Needs to come from db so new server start doesn't reset old games

interface SocketPlayer {
  color: number
}

interface SocketGame {
  game_id: number,
  game_name: string,
  game_owner: string,
  started: boolean,
  turn_timeout_length: number,
  skip_if_dc: boolean,
  turn_num: number,
  turn_phase: string,
  dice: number,
  end_turn_time: null | string,
  order: string[],
  id: {
    id_sub: Map<number, string>,
    sub_id: Map<string, number>,
    id_ctr: number
  },
  players: Map<string, SocketPlayer>, //sub token
  gameObj: Game
}

interface Road {
  start: number;
  end: number;
}

interface Extra {
  destinationHexId?: number,
  monopolyResource?: resourceType,
  targetVertices?: number[],
  yearOfPlentyResources?: resourceType[]
}

export default {
  players: new Map<string, number[]>(),
  games: new Map<number, SocketGame>(),
  newGame(user_id: string, game_name: string) {
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
      dice: [0, 0 ,0],
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

    this.games.get(nextGameID)?.players.set(user_id, {
      color: 0
    });

    if (this.players.has(user_id)){
      this.players.get(user_id)?.push(nextGameID);
    } else {
      this.players.set(user_id, [nextGameID]);
    }
    let game = this.games.get(nextGameID);
    if(game === undefined){
      console.error("Game is undefined");
      return;
    }

    game.id.id_sub.set(++game.id.id_ctr, user_id);
    game.id.sub_id.set(user_id, game.id.id_ctr);

    return this.games.get(nextGameID++);
  },

  joinGame(user_id: string, game_id: number) {
    /*
    * Adds user_id to game game_id if a spot is available & game has not started
    */
    if (this.games.has(game_id)) {
      let game = this.games.get(game_id);
      if(game === undefined) return;

      if (!game.started && game.players.size < 4 && !game.players.has(user_id)) {
        game.players.set(user_id, {
          color: game.players.size
        });
        if (this.players.has(user_id)){
          this.players.get(user_id)?.push(game.game_id);
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

  adminSetTimeout(user_id: string, game_id: number, timeout_s: number) {
    /*
    * Set timeout to timeout_s (seconds)
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if(game === undefined) return false;

    if (game.game_owner === user_id) {
      game.turn_timeout_length = timeout_s * 1000;
      return true;
    } else {
      console.log("You are not owner of this game");
    }
    return false;
  },

  adminBootPlayer(user_id: string, game_id: number, bootee: number) {
    /*
    * Boot player from game (before or after start, but slightly different behaviour)
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if(game === undefined) return false;

    if (game.game_owner === user_id && game.id.id_sub.has(bootee)) {

      if (!game.started) {
        let bootee_sub = game.id.id_sub.get(bootee);
        if(bootee_sub === undefined) return false;

        game.players.delete(bootee_sub);
        if (this.players.has(user_id)){
          let tmp = this.players.get(user_id)?.indexOf(game.game_id);
          if(tmp === undefined) return false;

          this.players.get(user_id)?.splice(tmp, 1);
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

  adminSetSkipDC(user_id: string, game_id: number, skip_disconnected_players: boolean) {
    /*
    * Set skip on disconnect
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if(game === undefined) return false;

    if (game.game_owner === user_id) {
      game.skip_if_dc = skip_disconnected_players;
      return true;
    } else {
      console.log("You are not owner of this game");
    }
    return false;

  },

  adminStartGame(user_id: string, game_id: number) {
    /*
    * Set started to true; shuffle players & begin initial placement before turns
    */
    if (this.games.has(game_id)) {
      let game = this.games.get(game_id);
      if(game === undefined) return;

      if (game.game_owner === user_id && !game.started && game.players.size <= 4 && game.players.size >= 1 ) {

        // shuffle function lifted from: https://javascript.info/task/shuffle
        // @ts-ignore
        function shuffle(array: any) {
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

  chColor(user_id: string, game_id: number, color: string) {
    /* (non-critical)
    *  If game_id has not started, set user_id to color if available
    */

  },

  playInitPlacement(user_id: string, game_id: number, settlement: number, road: Road) {
    /*
    * Player to place settlement & road (for game setup)
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if(game === undefined) return false;

    let whos_turn = this.whosTurn(game_id) as number;
    if (game.order[whos_turn] === user_id) {
      if (game.turn_phase === "build") {
        let player_num = this.whosTurn(game_id) as number;
        if (game.turn_num < game.order.length) {
          // First round of placement -- player should have 1 settlement + 1 road max
          if (game.gameObj.players[whos_turn].settlementsPlayed < 1 && game.gameObj.players[whos_turn].roadsPlayed < 1) {
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
          if (game.gameObj.players[whos_turn].settlementsPlayed < 2 && game.gameObj.players[whos_turn].roadsPlayed < 2) {
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

  playRollDice(user_id: string, game_id: number) {
    /*
    * Player to roll dice if it is start of their turn
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if(game === undefined) return false;

    const whos_turn = this.whosTurn(game_id) as number;
    if (game.order[whos_turn] === user_id) {
      if (game.turn_phase === "roll") {
        game.dice = game.gameObj.beginTurn();
        if (game.dice[0] == 7) {
          game.turn_phase = "robber";
        } else {
          game.turn_phase = "build";
        }
        return true;
      } else {
        console.log("Not in roll phase, actually in phase " + game.turn_phase);
      }
    } else {
      console.log("Not your turn, it is player " + game.order[whos_turn] + " turn and you are " + user_id);
    }
    return false;
  },

  playPurchaseRoad(user_id: string, game_id: number, start: number, end: number) {
    /*
    * Player to purchase a road at location if possible (determined by engine)
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if(game === undefined) return false;

    const whos_turn = this.whosTurn(game_id) as number;
    if (game.order[whos_turn] === user_id) {
      if (game.turn_phase === "build") {
        let ret = game.gameObj.purchaseRoad(start, end, whos_turn + 1);
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

  playPurchaseSettlement(user_id: string, game_id: number, location: number) {
    /*
    * Player to purchase a settlement at location if possible (determined by engine)
    */
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

    const whos_turn = this.whosTurn(game_id) as number;
    if (game.order[whos_turn] === user_id) {
      if (game.turn_phase === "build") {
        let ret = game.gameObj.purchaseSettlement(location, whos_turn + 1);
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

  playPurchaseCity(user_id: string, game_id: number, location: number) {
    /*
    * Player to purchase a city at location if possible (determined by engine)
    */
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

    const whos_turn = this.whosTurn(game_id) as number;
    if (game.order[whos_turn] === user_id) {
      if (game.turn_phase === "build") {
        let ret = game.gameObj.purchaseCity(location, whos_turn + 1);
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

  playPurchaseDevCard(user_id: string, game_id: number) {
    /*
    * Player to purchase dev card if possible (determined by engine)
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if(game === undefined) return false;

    const whos_turn = this.whosTurn(game_id) as number;
    if (game.order[whos_turn] === user_id) {
      if (game.turn_phase === "build") {
        let ret = game.gameObj.purchaseDevelopmentCard(whos_turn + 1);
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
  playDevCard(user_id: string, game_id: number, devcard: developmentType, extra: Extra) {
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
    if(game === undefined) return false;

    const whos_turn = this.whosTurn(game_id) as number;

    if (game.order[whos_turn] === user_id) {
      if (game.turn_phase === "build") {
        // game.gameObj.playDevelopmentCard(whos_turn + 1, devCard,
        //       destinationHexId?: number, monopolyResource?: resourceType,
        //       targetVertices?: number[], yearOfPlentyResources?: resourceType[] );
        let ret = game.gameObj.playDevelopmentCard(
          whos_turn + 1,
          devcard,
          extra.destinationHexId,
          extra.monopolyResource,
          extra.targetVertices,
          extra.yearOfPlentyResources
        );
        if (ret?.success) {
            this.calcVic(game_id);
            return true;
        } else {
          console.log(ret?.reason);
          return false;
        }
      } else {
        console.log("Not in build phase");
      }
    } else {
      console.log("Not your turn");
    }
  },

  playTradeWithBank(user_id: string, game_id: number, to_bank: resourceType, from_bank: resourceType) {
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

    const whos_turn = this.whosTurn(game_id) as number;

    if (game.order[whos_turn] === user_id) {
      if (game.turn_phase === "build") {
        let ret = game.gameObj.tradeWithBank(whos_turn + 1, to_bank, from_bank);
        if (ret?.success) {
            return true;
        } else {
          console.log(ret?.reason);
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

  playMoveRobber(user_id: string, game_id: number, location: number) {
    /*
    * Player to move robber & steal a card
    */
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

    const whos_turn = this.whosTurn(game_id) as number;

    if (game.order[whos_turn] === user_id) {
      if (game.turn_phase === "robber") {
        let ret = game.gameObj.moveRobberAndSteal(whos_turn + 1, location);
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

  playEndTurn(user_id: string, game_id: number, callback: any) {
    /*
    * Player ends their turn (if it is their turn && they are in build phase)
    */
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

    const whos_turn = this.whosTurn(game_id) as number;
    if (game.order[whos_turn] === user_id) {
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

  nextTurn(game_id: number, expected_turn: number, callback: any) {
    /*
    * Sets current turn to next player if turn is expected_turn
    * This allows for turn timeouts to only incremement the turn if they trigger
    * before their turn is ended
    */
    if (!this.games.has(game_id)) {
      return;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

    if (game.turn_num === expected_turn) {
      if (game.turn_num >= 0) {
        this.calcVic(game_id);
        if (game.gameObj.winner !== 0) {
          this.endGame(game_id);
        }
      }

      if (game.skip_if_dc) {
        let players_online = [];
        for (let p of game.order) {
          players_online.push(socketState.online.has(p));
        }
        let original_turn_num = game.turn_num;
        // cycle through all players at most twice until first online player found (need twice in case player goes offline during setup)
        game.turn_num += 1;

        const whos_turn = this.whosTurn(game_id) as number;
        while (!players_online[whos_turn] && game.turn_num - original_turn_num <= game.order.length*2) {
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
        game.dice = [0, 0, 0];
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

  calcVic(game_id: number){
    if (!this.games.has(game_id)) {
      return;
    }
    let game = this.games.get(game_id);
    if(game === undefined) return false;

    for (let i = 1; i <= game.players.size; i++) {
      game.gameObj.calculateVictoryPoints(i);
    }
  },

  get_full_game_info(game_id: number){
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

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
    const whos_turn = this.whosTurn(game_id) as number;
    let turnStartData = {
      game_id: game_id,
      winner: game.gameObj.winner,
      settings: {
        turn_timeout_length: game.turn_timeout_length,
        skip_offline_players: game.skip_if_dc
      },
      turn: {
        type: "normal",
        player: whos_turn + 1,
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

  get_player_info(game_id: number, player_num: number) {
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

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

  get_status(game_id: number) {
    return "active" // TODO: return something useful..
  },
  get_owner_sequence_num(game_id: number) {
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

    return game.order.indexOf(game.game_owner) + 1;
  },

  whosTurn(game_id: number) {
    /*
    * Returns the uid of the player who's turn it is currently in game_id
    */
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

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

  endGame(game_id: number){
    /*
    * Save results to database,
    * alert players game no longer active,
    */
   if(!this.games.has(game_id)){
     console.log("Trying to end a game that doesn't exist");
     return;
   }

    const game = this.games.get(game_id);
    if(game === undefined) return false;

    game.players.forEach((player: SocketPlayer, sub: string, map: any) => {
      let stats = game.gameObj.players[player.color] as any;

      const db_stats: IGame = {
        gameId: game_id,
        date: Date.now(),
        gameName: game.game_name,
        numPlayers: game.players.size,
        playerWon: game.gameObj.winner == player.color,
        playerSettlements: stats.settlementsPlayed,
        playerCities: stats.citiesPlayed,
        playerRoads: stats.roadsPlayed,
        playerResourceCards: stats.getTotalResources(),
        playerVictoryPoints: stats.vpDevCardsPlayed,
        playerLargestArmy: game.gameObj.largestArmyOwner == player.color,
        playerLongestRoad: game.gameObj.longestRoadOwner == player.color,
      };

      connectAndDo(async (db: any) => {
        if(db === undefined || db === null){
          console.log("Unable to connect to database to finish the game");
          return;
        }
        db.UserModel as typeof UserModel;
        let user = await db.UserModel.findBySub(sub);
        if(user === null){
          console.log("User does not exist");
          return;
        }

        await user.addGame(db_stats);
      });
   });
  },

  cleanUp(game_id: number) {
    /*
    * rm from player's active games list
    * rm from global available games list
    */
    if (!this.games.has(game_id)) {
      return false;
    }
    let game = this.games.get(game_id);
    if(game === undefined) return false;

    Array.from(game.players.keys()).forEach((sub: any) => {
      this.players.get(sub)?.splice(this.players.get(sub)?.indexOf(game_id) as number, 1);
    })
    this.games.delete(game_id);
  },

  cheat_get_cards(user_id: string, game_id: number, cards: any) {
    if (!this.games.has(game_id)) {
      return false;
    }

    let game = this.games.get(game_id);
    if(game === undefined) return false;

    let cheater = game.order.indexOf(user_id);
    game.gameObj.players[cheater].resources.sheep += cards.sheep;
    game.gameObj.players[cheater].resources.wheat += cards.wheat;
    game.gameObj.players[cheater].resources.wood += cards.wood;
    game.gameObj.players[cheater].resources.ore += cards.ore;
    game.gameObj.players[cheater].resources.brick += cards.brick;
    return true;
  }

}
