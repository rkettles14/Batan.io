import { Board } from "./board";
import { player, resourceType, vertexStatus } from "./enums";

class Player {
  name: player;
  victoryPoints: number;
  resources: {
    sheep: number;
    wheat: number;
    wood: number;
    ore: number;
    brick: number;
  };
  developmentCards: {
    knight: number;
    vp: number;
    buildRoad: number;
    yearOfPlenty: number;
    monopoly: number;
  };
  settlements: number;
  cities: number;
  longestRoad: number;
  armies: number;

  constructor(name: player) {
    this.name = name;
    this.victoryPoints = 0;
    this.resources = {
      sheep: 0,
      wheat: 0,
      wood: 0,
      ore: 0,
      brick: 0,
    };
    this.developmentCards = {
      knight: 0,
      vp: 0,
      buildRoad: 0,
      yearOfPlenty: 0,
      monopoly: 0,
    };
    this.settlements = 0;
    this.cities = 0;
    this.longestRoad = 0;
    this.armies = 0;
  }
}

class Game {
  winner: player;
  board: Board;
  players: Player[];
  bank: {
    resources: {
      sheep: number;
      wheat: number;
      wood: number;
      ore: number;
      brick: number;
    };
    developmentCards: {
      knight: number;
      vp: number;
      buildRoad: number;
      yearOfPlenty: number;
      monopoly: number;
    };
  };
  longestRoadOwner: player;
  largestArmyOwner: player;

  constructor() {
    this.winner = player.none;
    this.board = new Board();
    this.players = [
      new Player(player.red),
      new Player(player.white),
      new Player(player.blue),
      new Player(player.orange),
    ];
    this.bank = {
      resources: {
        sheep: 19,
        wheat: 19,
        wood: 19,
        ore: 19,
        brick: 19,
      },
      developmentCards: {
        knight: 14,
        vp: 5,
        buildRoad: 2,
        yearOfPlenty: 2,
        monopoly: 2,
      },
    };
    this.longestRoadOwner = player.none;
    this.largestArmyOwner = player.none;
  }

  rollDice() {
    const die1 = Math.floor(Math.random() * (6 - 1) + 1);
    const die2 = Math.floor(Math.random() * (6 - 1) + 1);
    const diceRoll = die1 + die2;

    if (diceRoll === 7) {
      //move robber logic and take resources
    } else {
      //give resources to players
      this.board.hexList.forEach((hex) => {
        if (hex.value == diceRoll && !hex.hasRobber) {
          hex.vertices.forEach((vertex) => {
            if (
              this.board.vertexList[vertex].status === vertexStatus.settlement
            ) {
              this.giveResources(
                this.board.vertexList[vertex].owner,
                hex.resourceType,
                1
              );
            } else if (
              this.board.vertexList[vertex].status === vertexStatus.city
            ) {
              this.giveResources(
                this.board.vertexList[vertex].owner,
                hex.resourceType,
                2
              );
            }
          });
        }
      });
    }
  }

  private giveResources(
    playerName: player,
    resource: resourceType,
    amount: number
  ) {
    let playerIndex = this.players.findIndex(
      (element) => element.name === playerName
    );
    if (
      resource === resourceType.brick &&
      this.bank.resources.brick >= amount
    ) {
      this.players[playerIndex].resources.brick += amount;
      this.bank.resources.brick -= amount;
    } else if (
      resource === resourceType.ore &&
      this.bank.resources.ore >= amount
    ) {
      this.players[playerIndex].resources.ore += amount;
      this.bank.resources.ore -= amount;
    } else if (
      resource === resourceType.sheep &&
      this.bank.resources.sheep >= amount
    ) {
      this.players[playerIndex].resources.sheep += amount;
      this.bank.resources.sheep -= amount;
    } else if (
      resource === resourceType.wheat &&
      this.bank.resources.wheat >= amount
    ) {
      this.players[playerIndex].resources.wheat += amount;
      this.bank.resources.wheat -= amount;
    } else if (
      resource === resourceType.wood &&
      this.bank.resources.wood >= amount
    ) {
      this.players[playerIndex].resources.wood += amount;
      this.bank.resources.wood -= amount;
    }
  }

  addRoad() {}

  addSettlement() {}

  addCity() {}

  buyDevelopmentCard() {}

  playDevelopmentCard() {}

  trade() {}

  //temporary, only used for testing
  getUserInput(prompt: string) {
    var readlineSync = require("readline-sync");
    return readlineSync.question(prompt);
  }
}

{
}
