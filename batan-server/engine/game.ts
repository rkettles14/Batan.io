import { Board } from "./board";
import { developmentType, harborType, player, resourceType, vertexStatus } from "./enums";

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
    victoryPointCard: number;
    roadBuilder: number;
    yearOfPlenty: number;
    monopoly: number;
  };
  settlementsPlayed: number;
  citiesPlayed: number;
  roadsPlayed: number;
  longestRoad: number;
  armies: number;
  vpDevCardsPlayed: number;

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
      victoryPointCard: 0,
      roadBuilder: 0,
      yearOfPlenty: 0,
      monopoly: 0,
    };
    this.settlementsPlayed = 0;
    this.citiesPlayed = 0;
    this.roadsPlayed = 0;
    this.longestRoad = 0;
    this.armies = 0;
    this.vpDevCardsPlayed = 0;
  }

  /**
   * Returns the number of a particular resource possessed by the player
   * @param resource
   */
  getPlayerResource(resource: resourceType) {
    if (resource === resourceType.brick) {
      return this.resources.brick;
    } else if (resource === resourceType.ore) {
      return this.resources.ore;
    } else if (resource === resourceType.sheep) {
      return this.resources.sheep;
    } else if (resource === resourceType.wheat) {
      return this.resources.wheat;
    } else if (resource === resourceType.wood) {
      return this.resources.wood;
    }
  }

  /**
   * Adds or removes resources from the Player
   * @param addResources if adding resources, true. If removing, false.
   * @param resource 
   * @param amount 
   */
  updatePlayerResources(addResources: boolean, resource: resourceType, amount: number) {
    if (addResources) {
      if (resource === resourceType.brick) {
        this.resources.brick += amount;
      } else if (resource === resourceType.ore) {
        this.resources.ore += amount;
      } else if (resource === resourceType.sheep) {
        this.resources.sheep += amount;
      } else if (resource === resourceType.wheat) {
        this.resources.wheat += amount;
      } else if (resource === resourceType.wood) {
        this.resources.wood += amount;
      }
      console.log(`${player[this.name]} recieved a ${resourceType[resource]}!`)
    } else {
      if (resource === resourceType.brick && this.resources.brick >= amount) {
        this.resources.brick -= amount;
      } else if (resource === resourceType.ore && this.resources.ore >= amount) {
        this.resources.ore -= amount;
      } else if (resource === resourceType.sheep && this.resources.sheep >= amount) {
        this.resources.sheep -= amount;
      } else if (resource === resourceType.wheat && this.resources.wheat >= amount) {
        this.resources.wheat -= amount;
      } else if (resource === resourceType.wood && this.resources.wood >= amount) {
        this.resources.wood -= amount;
      }
      console.log(`${player[this.name]} lost a ${resourceType[resource]}!`)
    }
  }

  updateDevCards(addDevCard: boolean, devCard: developmentType) {
    if (addDevCard) {
      if (devCard === developmentType.knight) {
        this.developmentCards.knight++;
      } else if (devCard === developmentType.monopoly) {
        this.developmentCards.monopoly++;
      } else if (devCard === developmentType.roadBuilder) {
        this.developmentCards.roadBuilder++;
      } else if (devCard === developmentType.victoryPointCard) {
        this.developmentCards.victoryPointCard++;
      } else if (devCard === developmentType.yearOfPlenty) {
        this.developmentCards.yearOfPlenty++;
      }
      console.log(`${player[this.name]} recieved a ${developmentType[devCard]}!`)
    } else {
      if (devCard === developmentType.knight && this.developmentCards.knight >= 1) {
        this.developmentCards.knight--;
      } else if (devCard === developmentType.monopoly && this.developmentCards.monopoly >= 1) {
        this.developmentCards.monopoly--;
      } else if (developmentType.roadBuilder && this.developmentCards.roadBuilder >= 1) {
        this.developmentCards.roadBuilder--;
      } else if (developmentType.victoryPointCard && this.developmentCards.victoryPointCard >= 1) {
        this.developmentCards.victoryPointCard--;
      } else if (devCard === developmentType.yearOfPlenty && this.developmentCards.yearOfPlenty >= 1) {
        this.developmentCards.yearOfPlenty--;
      }
      console.log(`${player[this.name]} lost a ${developmentType[devCard]}!`)
    }
  }

  /**
   * Temoprary for testing.
   */
  printStats() {

  }
}

export default class Game {
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
      victoryPointCard: number;
      roadBuilder: number;
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
        victoryPointCard: 5,
        roadBuilder: 2,
        yearOfPlenty: 2,
        monopoly: 2,
      },
    };
    this.longestRoadOwner = player.none;
    this.largestArmyOwner = player.none;
  }

  /**
   * Adds or removes resources from the Bank
   * @param addResources if adding resources, true. If removing, false.
   * @param resource 
   * @param amount 
   */
  private updateBankResources(addResources: boolean, resource: resourceType, amount: number) {
    if (addResources) {
      if (resource === resourceType.brick) {
        this.bank.resources.brick += amount;
      } else if (resource === resourceType.ore) {
        this.bank.resources.ore += amount;
      } else if (resource === resourceType.sheep) {
        this.bank.resources.sheep;
      } else if (resource === resourceType.wheat) {
        this.bank.resources.wheat += amount;
      } else if (resource === resourceType.wood) {
        this.bank.resources.wood += amount;
      }
    } else {
      if (resource === resourceType.brick && this.bank.resources.brick >= amount) {
        this.bank.resources.brick -= amount;
      } else if (resource === resourceType.ore && this.bank.resources.ore >= amount) {
        this.bank.resources.ore -= amount;
      } else if (resource === resourceType.sheep && this.bank.resources.sheep >= amount) {
        this.bank.resources.sheep -= amount;
      } else if (resource === resourceType.wheat && this.bank.resources.wheat >= amount) {
        this.bank.resources.wheat -= amount;
      } else if (resource === resourceType.wood && this.bank.resources.wood >= amount) {
        this.bank.resources.wood -= amount;
      }
    }
  }

  private updateDevCards(addDevCard: boolean, devCard: developmentType) {
    if (addDevCard) {
      if (devCard === developmentType.knight) {
        this.bank.developmentCards.knight++;
      } else if (devCard === developmentType.monopoly) {
        this.bank.developmentCards.monopoly++;
      } else if (devCard === developmentType.roadBuilder) {
        this.bank.developmentCards.roadBuilder++;
      } else if (devCard === developmentType.victoryPointCard) {
        this.bank.developmentCards.victoryPointCard++;
      } else if (devCard === developmentType.yearOfPlenty) {
        this.bank.developmentCards.yearOfPlenty++;
      }
    } else {
      if (devCard === developmentType.knight && this.bank.developmentCards.knight >= 1) {
        this.bank.developmentCards.knight--;
      } else if (devCard === developmentType.monopoly && this.bank.developmentCards.monopoly >= 1) {
        this.bank.developmentCards.monopoly--;
      } else if (developmentType.roadBuilder && this.bank.developmentCards.roadBuilder >= 1) {
        this.bank.developmentCards.roadBuilder--;
      } else if (developmentType.victoryPointCard && this.bank.developmentCards.victoryPointCard >= 1) {
        this.bank.developmentCards.victoryPointCard--;
      } else if (devCard === developmentType.yearOfPlenty && this.bank.developmentCards.yearOfPlenty >= 1) {
        this.bank.developmentCards.yearOfPlenty--;
      }
    }
  }

  /**
   * Returns the enum value of a given string.
   * @param resource 
   */
  private resourceStringToEnum(resource: string) {
    if (resource === "brick") {
      return resourceType.brick;
    }
    if (resource === "ore") {
      return resourceType.ore;
    }
    if (resource === "sheep") {
      return resourceType.sheep;
    }
    if (resource === "wheat") {
      return resourceType.wheat;
    }
    if (resource === "wood") {
      return resourceType.wood;
    }
    return resourceType.none;
  }

  private getPlayerIndexByEnum(playerName: player) {
    return this.players.findIndex((element) => element.name === playerName);
  }

  /**
   * Gives resources from the bank to a player.
   * @param playerName 
   * @param resource 
   * @param amount 
   */
  private giveResources(playerName: player, resource: resourceType, amount: number) {
    this.players[this.getPlayerIndexByEnum(playerName)].updatePlayerResources(true, resource, amount);
    this.updateBankResources(false, resource, amount);
  }

  /**
   * Takes resources from a player and gives them to the bank.
   * @param playerName 
   * @param resource 
   * @param amount 
   */
  private takeResources(playerName: player, resource: resourceType, amount: number) {
    this.players[this.getPlayerIndexByEnum(playerName)].updatePlayerResources(false, resource, amount);
    this.updateBankResources(true, resource, amount);
  }

  /**
   * Gives a single development card from the bank to a player
   * @param playerName 
   * @param devCard 
   */
  private giveDevCard(playerName: player, devCard: developmentType) {
    this.players[this.getPlayerIndexByEnum(playerName)].updateDevCards(true, devCard);
    this.updateDevCards(false, devCard);
  }

  /**
   * Takes a single development card from a player and gives it to the bank.
   * @param playerName 
   * @param devCard 
   */
  private takeDevCard(playerName: player, devCard: developmentType) {
    this.players[this.getPlayerIndexByEnum(playerName)].updateDevCards(false, devCard);
    this.updateDevCards(true, devCard);
  }

  /**
   * Take a random resource from player2 and gives it to player1
   * @param player1 recieves resource.
   * @param player2 loses resource.
   */
  private stealResource(player1: player, player2: player) {
    let player1Index = this.getPlayerIndexByEnum(player1);
    let player2Index = this.getPlayerIndexByEnum(player2);
    let player2TotalResources: resourceType[] = [];
    for (let i = 0; i < this.players[player2Index].resources.brick; i++) {
      player2TotalResources.push(resourceType.brick);
    }
    for (let i = 0; i < this.players[player2Index].resources.ore; i++) {
      player2TotalResources.push(resourceType.ore);
    }
    for (let i = 0; i < this.players[player2Index].resources.sheep; i++) {
      player2TotalResources.push(resourceType.sheep);
    }
    for (let i = 0; i < this.players[player2Index].resources.wheat; i++) {
      player2TotalResources.push(resourceType.wheat);
    }
    for (let i = 0; i < this.players[player2Index].resources.wood; i++) {
      player2TotalResources.push(resourceType.wood);
    }
    if (player2TotalResources.length > 0) {
      const randomIndex = Math.floor(Math.random() * player2TotalResources.length);
      let randomResource = player2TotalResources[randomIndex];
      this.players[player1Index].updatePlayerResources(true, randomResource, 1);
      this.players[player2Index].updatePlayerResources(false, randomResource, 1);
    }
  }

  /**
   * Takes random resources from a player and returns them to the bank
   * @param player 
   * @param amount 
   */
  private discardRandomResources(player: player, amount: number) {
    let playerIndex = this.getPlayerIndexByEnum(player);
    let playerTotalResources: resourceType[] = [];
    for (let i = 0; i < this.players[playerIndex].resources.brick; i++) {
      playerTotalResources.push(resourceType.brick);
    }
    for (let i = 0; i < this.players[playerIndex].resources.ore; i++) {
      playerTotalResources.push(resourceType.ore);
    }
    for (let i = 0; i < this.players[playerIndex].resources.sheep; i++) {
      playerTotalResources.push(resourceType.sheep);
    }
    for (let i = 0; i < this.players[playerIndex].resources.wheat; i++) {
      playerTotalResources.push(resourceType.wheat);
    }
    for (let i = 0; i < this.players[playerIndex].resources.wood; i++) {
      playerTotalResources.push(resourceType.wood);
    }
    if (playerTotalResources.length > 0) {
      for (let i = 0; i < amount; i++) {
        const randomIndex = Math.floor(Math.random() * playerTotalResources.length);
        let randomResource = playerTotalResources.splice(randomIndex, 1).pop();
        if (randomResource) {
          this.takeResources(player, randomResource, 1);
        }
      }
    }
  }

  /**
   * Draws a random development card from the bank and gives it to the player
   * @param owner 
   */
  private drawRandomDevelopmentCard(owner: player) {
    let allDevCards: developmentType[] = [];
    for (let i = 0; i < this.bank.developmentCards.knight; i++) {
      allDevCards.push(developmentType.knight)
    }
    for (let i = 0; i < this.bank.developmentCards.monopoly; i++) {
      allDevCards.push(developmentType.monopoly)
    }
    for (let i = 0; i < this.bank.developmentCards.roadBuilder; i++) {
      allDevCards.push(developmentType.roadBuilder)
    }
    for (let i = 0; i < this.bank.developmentCards.victoryPointCard; i++) {
      allDevCards.push(developmentType.victoryPointCard)
    }
    for (let i = 0; i < this.bank.developmentCards.yearOfPlenty; i++) {
      allDevCards.push(developmentType.yearOfPlenty)
    }
    if (allDevCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * allDevCards.length);
      let randomDevCard = allDevCards[randomIndex];
      this.giveDevCard(owner, randomDevCard);
    }
  }

  private moveRobberAndSteal(user: player, hexId: number) {
    //move robber
    //TODO emit to player who rolled
    // let playerReply: string = this.getUserInput(`${player[user]}, where would you like to place the robber?\n`);
    // let hexId = parseInt(playerReply);
    let affectedPlayers = this.board.moveRobber(hexId);

    // steal from random victim to simplify state/ event management for now..
    if (affectedPlayers.length > 0) {
      let victim = affectedPlayers[Math.floor(Math.random() * affectedPlayers.length)];
      this.stealResource(user, victim);
    }


    // Commented to simplify state/ event management for now..
    // //steal resource
    // if (affectedPlayers.length > 0) {
    //   let affectedPlayersString = "";
    //   affectedPlayers.forEach(element => {
    //     affectedPlayersString.concat(player[element] + " ");
    //   })
    //   //TODO emit to player who rolled
    //   playerReply = this.getUserInput("Who would you like to steal from? " + affectedPlayersString + '\n');
    //   let victim = player.none;
    //   if (playerReply === "blue") {
    //     victim = player.blue;
    //   }
    //   if (playerReply === "orange") {
    //     victim = player.orange;
    //   }
    //   if (playerReply === "red") {
    //     victim = player.red;
    //   }
    //   if (playerReply === "white") {
    //     victim = player.white;
    //   }
    //   this.stealResource(user, victim);
    // }
  }

  rollDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const diceRoll = die1 + die2;
    return diceRoll;
  }

  /**
   * Represents a player rolling the game dice. 
   * @param user 
   * @param roll 
   */
  beginTurn(user: player) {
    const diceRoll = this.rollDice();
    //emit dice roll for front end animation?

    if (diceRoll === 7) {
      //discard if more than 7
      this.players.forEach((player) => {
        let totalResources = player.resources.brick + player.resources.ore + player.resources.sheep + player.resources.wheat + player.resources.wood;
        if (totalResources >= 7) {
          // Removed due to time constraints.
          /*
          let reply = this.getUserInput(`Please discard ${Math.floor(totalResources/2)} resources\n`);
          let r = reply.split(";");
          r.forEach((element: string) => {
            var resourceAndNumber = element.split(" ");
            this.takeResources(player.name, this.resourceStringToEnum(resourceAndNumber[0]), parseInt(resourceAndNumber[1]))
          });
          */
          this.discardRandomResources(player.name, Math.floor(totalResources / 2));
        }
      })
    } else {
      //give resources to players
      this.board.hexList.forEach((hex) => {
        if (hex.value == diceRoll && !hex.hasRobber) {
          hex.vertices.forEach((vertex) => {
            if (this.board.vertexList[vertex].status === vertexStatus.settlement) {
              this.giveResources(this.board.vertexList[vertex].owner, hex.resourceType, 1);
            } else if (this.board.vertexList[vertex].status === vertexStatus.city) {
              this.giveResources(this.board.vertexList[vertex].owner, hex.resourceType, 2);
            }
          });
        }
      });
    }
    return diceRoll;
  }

  /**
   * Purchases and places a road on the game board. Buying a road requires a brick and a wood resource.
   * @param startVertexId 
   * @param endVertexId 
   * @param buyer 
   */
  purchaseRoad(startVertexId: number, endVertexId: number, buyer: player) {
    let playerIndex = this.getPlayerIndexByEnum(buyer);
    let playerResources = this.players[playerIndex].resources;
    let roadsPlayed = this.players[playerIndex].roadsPlayed;
    if (playerResources.brick >= 1 && playerResources.wood >= 1 && roadsPlayed < 15) {
      this.takeResources(buyer, resourceType.brick, 1);
      this.takeResources(buyer, resourceType.wood, 1);
      this.board.addRoad(startVertexId, endVertexId, buyer);
      this.players[playerIndex].roadsPlayed++;
      this.players[playerIndex].longestRoad = this.board.getPlayerLongestRoad(buyer);
      this.awardLongestRoad();
    }
    else {
      console.log("You don't have enough resources or you don't have any road pieces left!");
    }
  }

  /**
   * Purchases and places a settlement on the game board. 
   * Buying a settlement requires a brick, wood, sheep, and wheat resource.
   * @param vertexId 
   * @param buyer 
   */
  purchaseSettlement(vertexId: number, buyer: player) {
    let playerIndex = this.getPlayerIndexByEnum(buyer);
    let playerResources = this.players[playerIndex].resources;
    let settlementsPlayed = this.players[playerIndex].settlementsPlayed;
    if (playerResources.brick >= 1 && playerResources.wood >= 1 && playerResources.sheep >= 1 && playerResources.wheat >= 1 && settlementsPlayed < 5) {
      this.takeResources(buyer, resourceType.brick, 1);
      this.takeResources(buyer, resourceType.wood, 1);
      this.takeResources(buyer, resourceType.sheep, 1);
      this.takeResources(buyer, resourceType.wheat, 1);
      this.board.addSettlement(vertexId, buyer);
      this.players[playerIndex].settlementsPlayed++;

      //if a player lays a settlement along another player's road, recalculate the other player's longest road.
      let neighbours = this.board.roadsMap.get(vertexId);
      let neighbourRoadCounts = new Array(4).fill(0);
      neighbours?.forEach(neighbour => {
        if (neighbour[1] !== player.none && neighbour[1] !== buyer) {
          neighbourRoadCounts[neighbour[1]]++;
        }
      })
      for (let i = 0; i < neighbourRoadCounts.length; i++) {
        if (neighbourRoadCounts[i] >= 2) {
          this.players[this.getPlayerIndexByEnum(i)].longestRoad = this.board.getPlayerLongestRoad(i);
          this.awardLongestRoad();
        }
      }

    }
    else {
      console.log("You don't have enough resources or you don't have any settlement pieces left!");
    }
  }

  /**
   * Purchases and places a city on the game board. 
   * Buying a city requires two wheat and three ore resources.
   * @param vertexId 
   * @param buyer 
   */
  purchaseCity(vertexId: number, buyer: player) {
    let playerIndex = this.getPlayerIndexByEnum(buyer);
    let playerResources = this.players[playerIndex].resources;
    let citiesPlayed = this.players[playerIndex].citiesPlayed;
    if (playerResources.wheat >= 2 && playerResources.ore >= 3 && citiesPlayed < 4) {
      this.takeResources(buyer, resourceType.wheat, 2);
      this.takeResources(buyer, resourceType.ore, 3);
      this.board.addCity(vertexId, buyer);
      this.players[playerIndex].settlementsPlayed--;
      this.players[playerIndex].citiesPlayed++;
    }
    else {
      console.log("You don't have enough resources or you don't have any city pieces left!");
    }
  }

  /**
   * Purchases a development card and gives it to the buyer.
   * @param buyer 
   */
  purchaseDevelopmentCard(buyer: player) {
    let playerIndex = this.getPlayerIndexByEnum(buyer);
    let playerResources = this.players[playerIndex].resources;
    if (playerResources.wheat >= 1 && playerResources.sheep >= 1 && playerResources.ore >= 1) {
      this.takeResources(buyer, resourceType.wheat, 1);
      this.takeResources(buyer, resourceType.sheep, 1);
      this.takeResources(buyer, resourceType.ore, 1);
      this.drawRandomDevelopmentCard(buyer);
    }
    else {
      console.log("You don't have enough resources for this!");
    }
  }

  /**
   * Plays a single development card. TODO: make sure only one is played per turn, and not in the same turn as it was purchased
   * @param player 
   * @param devCard 
   */
  playDevelopmentCard(player: player, devCard: developmentType) { //move the robber and steal from a player, add one to your army
    this.takeDevCard(player, devCard)
    let playerIndex = this.getPlayerIndexByEnum(player);
    if (devCard === developmentType.knight) {
      this.moveRobberAndSteal(player);
      this.players[playerIndex].armies++;
      this.awardLargestArmy();
    }
    else if (devCard === developmentType.monopoly) { //steal all of a particular resource from the other players
      //TODO emit to player
      let playerReply = this.getUserInput("What resource would you like to take?\n");
      let targetResource = this.resourceStringToEnum(playerReply);
      let count = 0;
      this.players.forEach(player => {
        let amount = player.getPlayerResource(targetResource) ?? 0;
        count += amount;
        player.updatePlayerResources(false, targetResource, amount);
      })
      this.players[playerIndex].updatePlayerResources(true, targetResource, count);
    }
    else if (devCard === developmentType.roadBuilder) { //build two free roads if you have the pieces
      for (let i = 0; i < 2; i++) {
        let roadsPlayed = this.players[playerIndex].roadsPlayed;
        if (roadsPlayed < 15) {
          //TODO emit to player
          let playerReply = this.getUserInput("Where would you like to place a road? (start, end)\n");
          let targetVertices = playerReply.split(',');
          this.board.addRoad(targetVertices[0], targetVertices[1], player);
          this.players[playerIndex].roadsPlayed++;
          this.players[playerIndex].longestRoad = this.board.getPlayerLongestRoad(player);
          this.awardLongestRoad();
        }
      }
    }
    else if (devCard === developmentType.victoryPointCard) { //add a victory point
      this.players[playerIndex].vpDevCardsPlayed++;
    }
    else if (devCard === developmentType.yearOfPlenty) { //take any two resource from the bank
      //TODO emit to user
      let playerReply = this.getUserInput("What resources would you like? (resource1, resource2)\n");
      let resources = playerReply.split(',');
      let firstResource = this.resourceStringToEnum(resources[0]);
      let secondResource = this.resourceStringToEnum(resources[1]);
      this.giveResources(player, firstResource, 1);
      this.giveResources(player, secondResource, 1);
    }
  }

  /**
   * Awards the longest road owner. If no one has a road longer than 4, longest road is not awarded.
   */
  awardLongestRoad() {
    let longestRoadLength: number;
    if (this.longestRoadOwner != player.none) {
      longestRoadLength = 4;
    }
    else {
      longestRoadLength = this.players[this.getPlayerIndexByEnum(this.longestRoadOwner)].longestRoad;
    }
    this.players.forEach(player => {
      if (player.longestRoad > longestRoadLength) {
        this.longestRoadOwner = player.name;
      }
    })
  }

  /**
   * Awards the largest army owner. If no one has an army larger than 2, largest army is not awarded.
   */
  private awardLargestArmy() {
    let largestArmyLength: number;
    if (this.largestArmyOwner != player.none) {
      largestArmyLength = 2;
    }
    else {
      largestArmyLength = this.players[this.getPlayerIndexByEnum(this.largestArmyOwner)].armies;
    }
    this.players.forEach(player => {
      if (player.armies > largestArmyLength) {
        this.largestArmyOwner = player.name;
      }
    })
  }


  /**
   * Calculates the victory points of the given player. This should be called at the end of each turn to determine a winner.
   * @param player
   */
  calculateVictoryPoints(player: player) {
    let playerIndex = this.getPlayerIndexByEnum(player);
    let vp = 0;
    vp += this.players[playerIndex].settlementsPlayed;
    vp += this.players[playerIndex].citiesPlayed * 2;
    if (this.longestRoadOwner === player) {
      vp += 2;
    }
    if (this.largestArmyOwner === player) {
      vp += 2;
    }
    vp += this.players[playerIndex].vpDevCardsPlayed;

    this.players[playerIndex].victoryPoints = vp;
    if (vp >= 10) {
      this.winner === player; //game ends. congrats.
    }
  }

  /**
   * Trades resources with the bank. This is a 4:1 trade if no harbors are owned, 
   * 3:1 if the threeForOne harbor is owned, and 2:1 if given resource harbor is owned.
   * @param player 
   * @param resourceToBank 
   * @param resourceFromBank 
   */
  tradeWithBank(player: player, resourceToBank: resourceType, resourceFromBank: resourceType) {
    let playerIndex = this.getPlayerIndexByEnum(player);
    let resourceHarborOwned = false;
    let threeForOneHarborOwned = false;
    if (resourceToBank !== resourceType.none) {
      this.board.vertexList.forEach(vertex => {
        let harborResource = this.resourceStringToEnum(harborType[vertex.harbor]);
        if (vertex.owner === player && harborResource === resourceToBank) {
          resourceHarborOwned = true;
        }
        if (vertex.owner === player && vertex.harbor === harborType.threeForOne) {
          threeForOneHarborOwned = true;
        }
      })

      let requiredNumberOfResources = resourceHarborOwned ? 2 : threeForOneHarborOwned ? 3 : 4;
      let playerResourceCount = this.players[playerIndex].getPlayerResource(resourceToBank) ?? 0;
      if (playerResourceCount >= requiredNumberOfResources) {
        this.takeResources(player, resourceToBank, requiredNumberOfResources);
        this.giveResources(player, resourceFromBank, 1);
      }
      else {
        console.log("You don't have enough resources for this!");
      }
    }
  }

  replacer(this: any, key: any, value: any) {
    const obj = this[key];
    if (obj instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(obj.entries())
      };
    } else {
      return value;
    }
  }

  toJsonString() {
    return JSON.stringify(this, this.replacer);
  }


  //temporary, only used for testing
  getUserInput(prompt: string) {
    var readlineSync = require("readline-sync");
    return readlineSync.question(prompt);
  }
}

{
  //let game = new Game();
  // game.board.addSettlement(23, player.red);
  // game.board.printBoard();
  // game.rollDice(player.red, 9);
  // game.rollDice(player.red, 9);
  // game.rollDice(player.red, 8);
  // game.rollDice(player.red, 8);
  // game.rollDice(player.red, 4);
  // game.rollDice(player.red, 4);
  // game.rollDice(player.red, 9);
  // game.rollDice(player.red, 9);
  // let bank = game.bank;
  // console.log(bank);
  // let PlayerRedResorces = game.players[0].resources; 
  // console.log(PlayerRedResorces);
}
