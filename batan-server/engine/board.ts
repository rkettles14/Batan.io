import { vertexStatus, player, resourceType, harborType } from "./enums";

class Vertex {
    id: number;
    owner: player;
    harbor: harborType;
    status: vertexStatus;
    constructor(id: number, owner: player, harbor: harborType, status: vertexStatus) {
        this.id = id;
        this.owner = owner;
        this.harbor = harbor;
        this.status = status;
    }
}

class Hex {
    resourceType: resourceType;
    value: number;
    vertices: number[];
    hasRobber: boolean;
    constructor() {
        this.resourceType = resourceType.none;
        this.value = -1;
        this.vertices = [];
        this.hasRobber = false;
    }
}

/**
 * Represents the Game Board
 */
export class Board {
    roadsMap: Map<number, [number, player][]>; //contains mappings from one vertex to all adjacent pertices. `player` indicates the owner of the road between vertices.
    vertexList: Vertex[]; //contains actual vertices with data
    hexList: Hex[]; //contains hexagon data

    constructor() {
        this.roadsMap = new Map();
        this.vertexList = [];
        this.hexList = [];
        this.initStandardBoard();
        this.initHexagons();

    }

    /**
    * Initialized the standard game board seen below.
    *
    *
         0   1   2
        / \ / \ / \
       3   4   5   6
       |   |   |   |
       7   8   9   10
      / \ / \ / \ / \
     11  12  13  14  15
     |   |   |   |   |
     16  17  18  19  20
    / \ / \ / \ / \ / \
   21  22  23  24  25  26
   |   |   |   |   |   |
   27  28  29  30  31  32
    \ / \ / \ / \ / \ /
     33  34  35  36  37
     |   |   |   |   |
     38  39  40  41  42
      \ / \ / \ / \ / 
       43  44  45  46
       |   |   |   |
       47  48  49  50
        \ / \ / \ /
         51  52  53
    */
    private initStandardBoard() {
        let vertices = 54; //number of vertices on standard board
        for (var i = 0; i < vertices; i++) //will have to change if we want more hexes in the future
        {
            this.addVertex();
        }

        this.addEdge(0, 3);
        this.addEdge(0, 4);
        this.addEdge(1, 4);
        this.addEdge(1, 5);
        this.addEdge(2, 5);
        this.addEdge(2, 6);

        this.addEdge(3, 7);
        this.addEdge(4, 8);
        this.addEdge(5, 9);
        this.addEdge(6, 10);

        this.addEdge(7, 11);
        this.addEdge(7, 12);
        this.addEdge(8, 12);
        this.addEdge(8, 13);
        this.addEdge(9, 13);
        this.addEdge(9, 14);
        this.addEdge(10, 14);
        this.addEdge(10, 15);

        this.addEdge(11, 16);
        this.addEdge(12, 17);
        this.addEdge(13, 18);
        this.addEdge(14, 19);
        this.addEdge(15, 20);

        this.addEdge(16, 21);
        this.addEdge(16, 22);
        this.addEdge(17, 22);
        this.addEdge(17, 23);
        this.addEdge(18, 23);
        this.addEdge(18, 24);
        this.addEdge(19, 24);
        this.addEdge(19, 25);
        this.addEdge(20, 25);
        this.addEdge(20, 26);

        this.addEdge(21, 27);
        this.addEdge(22, 28);
        this.addEdge(23, 29);
        this.addEdge(24, 30);
        this.addEdge(25, 31);
        this.addEdge(26, 32);

        this.addEdge(27, 33);
        this.addEdge(28, 33);
        this.addEdge(28, 34);
        this.addEdge(29, 34);
        this.addEdge(29, 35);
        this.addEdge(30, 35);
        this.addEdge(30, 36);
        this.addEdge(31, 36);
        this.addEdge(31, 37);
        this.addEdge(32, 37);

        this.addEdge(33, 38);
        this.addEdge(34, 39);
        this.addEdge(35, 40);
        this.addEdge(36, 41);
        this.addEdge(37, 42);

        this.addEdge(38, 43);
        this.addEdge(39, 43);
        this.addEdge(39, 44);
        this.addEdge(40, 44);
        this.addEdge(40, 45);
        this.addEdge(41, 45);
        this.addEdge(41, 46);
        this.addEdge(42, 46);

        this.addEdge(43, 47);
        this.addEdge(44, 48);
        this.addEdge(45, 49);
        this.addEdge(46, 50);

        this.addEdge(47, 51);
        this.addEdge(48, 51);
        this.addEdge(48, 52);
        this.addEdge(49, 52);
        this.addEdge(49, 53);
        this.addEdge(50, 53);
        this.initHarbors();
    }

    private initHarbors() {
        this.vertexList[0].harbor = harborType.threeForOne;
        this.vertexList[3].harbor = harborType.threeForOne;
        this.vertexList[1].harbor = harborType.wheat;
        this.vertexList[5].harbor = harborType.wheat;
        this.vertexList[10].harbor = harborType.ore;
        this.vertexList[15].harbor = harborType.ore;
        this.vertexList[26].harbor = harborType.threeForOne;
        this.vertexList[32].harbor = harborType.threeForOne;
        this.vertexList[42].harbor = harborType.sheep;
        this.vertexList[46].harbor = harborType.sheep;
        this.vertexList[49].harbor = harborType.threeForOne;
        this.vertexList[52].harbor = harborType.threeForOne;
        this.vertexList[51].harbor = harborType.threeForOne;
        this.vertexList[47].harbor = harborType.threeForOne;
        this.vertexList[38].harbor = harborType.brick;
        this.vertexList[33].harbor = harborType.brick;
        this.vertexList[16].harbor = harborType.wood;
        this.vertexList[11].harbor = harborType.wood;

    }

    private addVertex() {
        const id = this.vertexList.length;
        this.vertexList.push(new Vertex(id, player.none, harborType.none, vertexStatus.open))
        this.roadsMap.set(id, []);
    }

    private addEdge(v: number, w: number) {
        this.roadsMap.get(v)?.push([w, player.none]);
        this.roadsMap.get(w)?.push([v, player.none]);
    }

    private getEdge(v: number, w: number) {
        let edges = this.roadsMap.get(v);
        if (!edges) {
            return;
        }
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            if (edge[0] == w) {
                return edge;
            }
        }
        return;
    }

    private setEdge(v: number, w: number, val: player) {
        let edges = this.roadsMap.get(v);
        if (!edges) {
            return;
        }
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            if (edge[0] == w) {
                edge[1] = val;
            }
        }
    }

    /**
     * Randomizes the resources prodced by each hex.
     */
    private randomizeHexResources() { //will have to change if we want more hexes in the future
        for (let i = 0; i < this.hexList.length; i++) {
            if (i < 4) {
                this.hexList[i].resourceType = resourceType.sheep;
            } else if (i >= 4 && i < 8) {
                this.hexList[i].resourceType = resourceType.wheat;
            } else if (i >= 8 && i < 12) {
                this.hexList[i].resourceType = resourceType.wood;
            } else if (i >= 12 && i < 15) {
                this.hexList[i].resourceType = resourceType.ore;
            } else if (i >= 15 && i < 18) {
                this.hexList[i].resourceType = resourceType.brick;
            } else {
                this.hexList[i].resourceType = resourceType.none;
            }
        }

        let currentIndex = this.hexList.length
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = this.hexList[currentIndex];
            this.hexList[currentIndex] = this.hexList[randomIndex];
            this.hexList[randomIndex] = temporaryValue;
        }
    }


    /**
     * Sets values corresponding to dice rolls.
     * Values are placed by randomly selecting a hex on the outer ring
     * and continuing in a clockwise spiral moving toward the middle.
     * Numbers are ordered according to the official distribution found here:
     * https://boardgames.stackexchange.com/questions/2740/distribution-of-tokens-in-standard-4-player-catan
     */
    private setHexValues() {
        let outerRing = [0, 1, 2, 6, 11, 15, 18, 17, 16, 12, 7, 3];
        let innerRing = [4, 5, 10, 14, 13, 8];
        let center = 9;
        let entryMap = new Map()
        entryMap.set(0, 4);
        entryMap.set(1, 4);
        entryMap.set(2, 5);
        entryMap.set(6, 5);
        entryMap.set(11, 10);
        entryMap.set(15, 10);
        entryMap.set(18, 14);
        entryMap.set(17, 14);
        entryMap.set(16, 13);
        entryMap.set(12, 13);
        entryMap.set(7, 8);
        entryMap.set(3, 8);
        let balancedValues = [5, 2, 6, 10, 9, 4, 3, 8, 11, 5, 8, 4, 3, 6, 10, 11, 12, 9];
        let index = Math.floor(Math.random() * 12);
        let entryPoint = index;
        let bvIndex = 0;

        //apply the outer ring
        for (let i = 0; i < outerRing.length; i++) {
            if (this.hexList[outerRing[index]].resourceType !== resourceType.none) {
                this.hexList[outerRing[index]].value = balancedValues[bvIndex];
                bvIndex++;
            } else {
                this.hexList[outerRing[index]].value = 0; //if desert, set value to 0, init robber
                this.hexList[outerRing[index]].hasRobber = true;
            }
            index++;
            if (index == outerRing.length) {
                index = 0;
            }
        }

        //apply inner ring
        index = innerRing.indexOf(entryMap.get(outerRing[entryPoint]));

        for (let i = 0; i < innerRing.length; i++) {
            if (this.hexList[innerRing[index]].resourceType !== resourceType.none) {
                this.hexList[innerRing[index]].value = balancedValues[bvIndex];
                bvIndex++;
            } else {
                this.hexList[innerRing[index]].value = 0; //if desert, set value to 0, init robber
                this.hexList[innerRing[index]].hasRobber = true;
            }
            index++;
            if (index == innerRing.length) {
                index = 0;
            }
        }

        //apply center
        if (this.hexList[center].resourceType !== resourceType.none) {
            this.hexList[center].value = balancedValues[bvIndex];
        } else {
            this.hexList[center].value = 0; //if desert, set value to 0, init robber
            this.hexList[center].hasRobber = true;
        }
    }

    /**
     * Set Vertices owned by each Hex.
     */
    private setHexVertices() {
        for (let i = 0; i < 3; i++) {
            this.hexList[i].vertices = [0 + i, 3 + i, 4 + i, 7 + i, 8 + i, 12 + i];
        }
        for (let i = 3, j = 0; i < 7; i++, j++) {
            this.hexList[i].vertices = [7 + j, 11 + j, 12 + j, 16 + j, 17 + j, 22 + j];
        }
        for (let i = 7, j = 0; i < 12; i++, j++) {
            this.hexList[i].vertices = [16 + j, 21 + j, 22 + j, 27 + j, 28 + j, 33 + j];
        }
        for (let i = 12, j = 0; i < 16; i++, j++) {
            this.hexList[i].vertices = [28 + j, 33 + j, 34 + j, 38 + j, 39 + j, 43 + j];
        }
        for (let i = 16, j = 0; i < 19; i++, j++) {
            this.hexList[i].vertices = [39 + j, 43 + j, 44 + j, 47 + j, 48 + j, 51 + j];
        }
    }

    /**
     * Initializes hexagons.
     * Hexagons are ordered from 0-19 statring from the top left and moving left to right, up to down.
     */
    private initHexagons() {
        let hexAmt = 19;
        for (let i = 0; i < hexAmt; i++) {
            this.hexList[i] = new Hex();
        }
        this.randomizeHexResources();
        this.setHexValues();
        this.setHexVertices();

    }

    private getEdgeSymbol(v: number, w: number) {
        let playerColor = this.getEdge(v, w);
        if (playerColor) {
            let symbol = player[playerColor[1]].charAt(0).toLowerCase();
            if (symbol == "n") {
                return null
            }
            return symbol;
        }
    }

    private getVertexSymbol(v: number) {
        let symbol = player[this.vertexList[v].owner].charAt(0).toUpperCase();
        if (this.vertexList[v].status === vertexStatus.city) {
            symbol = `[${symbol}]`;
        } else {
            symbol = ` ${symbol} `;
        }
        if (symbol == " N ") {
            return " * "
        }
        return symbol;
    }

    private getHexSymbol(v: number) {
        return `${this.hexList[v].value}`.padStart(2, '0');
    }


    /**
     * Returns every vertex along a given players road, regardless of ownership of the vertex.
     * @param owner
     */
    private getVerticesOnRoads(owner: player) {
        //get every vertex that is on a road i own
        let v: number[] = [];
        this.vertexList.forEach(vertex => {
            let startVertex = this.roadsMap.get(vertex.id);
            let isAdjacentRoad = false;
            if (startVertex) {
                for (let i = 0; i < startVertex.length; i++) {
                    //check each edge for road belonging to owner
                    if (startVertex[i][1] === owner) {
                        isAdjacentRoad = true;
                    }
                }
                if (isAdjacentRoad) {
                    v.push(vertex.id);
                }
            }
        })
        return v;
    }


    /**
     * Recursively finds the longest distance from the root vertex to every other vertex on the board.
     * The root vertex (assuming it is not in a cycle) and all other vertices that cannot be
     * reached will have a distance of 0.
     * Returns an array of distances where the index is the destination vertex.
     * @param distaceFromRoot
     * @param visited 
     * @param previousVertexId 
     * @param owner 
     * @param vertexId 
     * @param currSum 
     */
    private getAllPaths(distaceFromRoot: number[], visited: boolean[], previousVertexId: number, owner: player, vertexId: number, currSum: number) {
        if (visited[vertexId]) {
            return;
        }
        visited[vertexId] = true;
        if (distaceFromRoot[vertexId] < currSum) {
            distaceFromRoot[vertexId] = currSum;
        }
        let adjacentVertices = this.roadsMap.get(vertexId);
        adjacentVertices?.forEach(vertex => {
            //If the next vertex has been visited AND there is a road there, then we must increment distance. ...Handles loops.
            if (visited[vertex[0]] && vertex[1] === owner && vertex[0] !== previousVertexId) {
                if (distaceFromRoot[vertex[0]] < currSum + 1) {
                    distaceFromRoot[vertex[0]] = currSum + 1;
                }
                //does that next vertex have a neighbour that hasn't been visited?
                let neighboursOfNeighbours = this.roadsMap.get(vertex[0]);
                neighboursOfNeighbours?.forEach(neighbourVertex => {
                    if (!visited[neighbourVertex[0]] && neighbourVertex[1] === owner && (this.vertexList[neighbourVertex[0]].status === vertexStatus.open || this.vertexList[neighbourVertex[0]].status === vertexStatus.blocked || this.vertexList[neighbourVertex[0]].owner === owner)) {
                        this.getAllPaths(distaceFromRoot, visited, vertex[0], owner, neighbourVertex[0], currSum + 2);
                    }
                })
            }
            if (vertex[1] === owner && (this.vertexList[vertex[0]].status === vertexStatus.open || this.vertexList[vertex[0]].status === vertexStatus.blocked || this.vertexList[vertex[0]].owner === owner)) {
                this.getAllPaths(distaceFromRoot, visited, vertexId, owner, vertex[0], currSum + 1)
            }
        })
        visited[vertexId] = false;
    }

    /**
     * Adds a road to the game board.
     * @param startVertexId 
     * @param endVertexId 
     * @param owner 
     */
    addRoad(startVertexId: number, endVertexId: number, owner: player) {
        let edge = this.getEdge(startVertexId, endVertexId);
        if (!edge) {
            return false; //edge doesn't exist!
        }
        if (edge[1] !== player.none) {
            return false; //already a road here!
        }

        //check if legal move
        let startVertex = this.roadsMap.get(startVertexId);
        let endVertex = this.roadsMap.get(endVertexId);
        let isAdjacentRoad = false;
        if (startVertex) {
            for (let i = 0; i < startVertex.length; i++) {
                //check each edge for road belonging to owner
                if (startVertex[i][1] === owner) {
                    isAdjacentRoad = true;
                }
            }
            
        }
        if (endVertex) {
            for (let i = 0; i < endVertex.length; i++) {
                //check each edge for road belonging to owner
                if (endVertex[i][1] === owner) {
                    isAdjacentRoad = true;
                }
            }
            
        }

        //check if owner has an adjacent settlement or road. If yes, add road.
        if (this.vertexList[startVertexId].owner === owner || this.vertexList[endVertexId].owner === owner || isAdjacentRoad) {
            this.setEdge(startVertexId, endVertexId, owner);
            this.setEdge(endVertexId, startVertexId, owner);
            return true;
        } else {
            return false; //Operation failed due to illegal road placement
        }

    }

    /**
     * Adds a road in the setup phase. Does not check for adjacent roads.
     * @param startVertexId 
     * @param endVertexId 
     * @param owner 
     */
    addRoadInSetup(startVertexId: number, endVertexId: number, owner: player) {
        let edge = this.getEdge(startVertexId, endVertexId);
        if (!edge) {
            return false; //edge doesn't exist!
        }
        if (edge[1] !== player.none) {
            return false; //already a road here!
        }

        //check if owner has an adjacent settlement. If yes, add road.
        if (this.vertexList[startVertexId].owner === owner || this.vertexList[endVertexId].owner === owner) {
            this.setEdge(startVertexId, endVertexId, owner);
            this.setEdge(endVertexId, startVertexId, owner);
            return true;
        } else {
            return false; //Operation failed due to illegal road placement
        }

    }

    /**
     * Returns the longest road owned by the given player.
     * @param owner
     */
    getPlayerLongestRoad(owner: player) {
        let playerVertices = this.getVerticesOnRoads(owner);
        let longestRoad = 0;
        playerVertices.forEach(root => {
            let maxDistancesArray: number[] = new Array(54).fill(0);
            let visited: boolean[] = new Array(54).fill(false);
            this.getAllPaths(maxDistancesArray, visited, root, owner, root, 0);
            let max = Math.max(...maxDistancesArray);
            if (longestRoad < max) {
                longestRoad = max;
            }
        })
        return longestRoad;
    }

    /**
     * Adds a settlement to the game board.
     * @param vertexId 
     * @param owner 
     */
    addSettlement(vertexId: number, owner: player) {
        if (!this.vertexList[vertexId]) {
            return false; //vertex is out of range
        }
        let startVertex = this.roadsMap.get(vertexId);
        let hasAdjacentRoad = false;
        if (startVertex) {
            for (let i = 0; i < startVertex.length; i++) {
                //check each edge for road belonging to owner
                if (startVertex[i][1] === owner) {
                    hasAdjacentRoad = true;
                }
            }
        }
        if (this.vertexList[vertexId].status === vertexStatus.open && hasAdjacentRoad) {
            this.vertexList[vertexId].status = vertexStatus.settlement;
            this.vertexList[vertexId].owner = owner;
            let adjacent = this.roadsMap.get(vertexId);
            //Set adjacent vertices to "blocked" status.
            if (adjacent) {
                for (let i = 0; i < adjacent.length; i++) {
                    this.vertexList[adjacent[i][0]].status = vertexStatus.blocked;
                }
            }
            return true;
        } else {
            return false; //Operation failed because there is no adjacent road or vertex is not open.
        }
    }

    /**
     * Adds a settlement to the game board. This does not check for adjacent roads.
     * @param vertexId 
     * @param owner 
     */
    addSettlementInSetup(vertexId: number, owner: player) {
        if (!this.vertexList[vertexId]) {
            return false; //vertex is out of range.
        }
        if (this.vertexList[vertexId].status === vertexStatus.open) {
            this.vertexList[vertexId].status = vertexStatus.settlement;
            this.vertexList[vertexId].owner = owner;
            let adjacent = this.roadsMap.get(vertexId);
            if (adjacent) {
                for (let i = 0; i < adjacent.length; i++) {
                    this.vertexList[adjacent[i][0]].status = vertexStatus.blocked;
                }
            }
            return true;
        } else {
            return false; //Operation failed because vertex is not open.
        }
    }

    /**
     * Adds a city to the game board.
     * @param indexId 
     * @param owner 
     */
    addCity(indexId: number, owner: player) {
        if (!this.vertexList[indexId]) {
            return false; //vertex is out of range.
        }
        if (this.vertexList[indexId].status === vertexStatus.settlement && this.vertexList[indexId].owner === owner) {
            this.vertexList[indexId].status = vertexStatus.city;
            return true;
        } else {
            return false; //Operation failed because there was not a settlement belonging to the owner at the given index.
        }
    }

    /**
     * Moves the robber from its current space to a new one. Returns an array of affected players.
     * @param destinationHex 
     */
    moveRobber(destinationHex: number) {
        let affectedPlayers: player[] = [];
        if (!this.hexList[destinationHex]) {
            return {
                success: false, //hex out of range
                affectedPlayers: affectedPlayers
            }
        }
        let previousHex = -1;
        this.hexList.forEach((hex) => {
            if (hex.hasRobber) {
                hex.hasRobber = false;
                previousHex = this.hexList.indexOf(hex);
            }
        })

        if (previousHex !== destinationHex) {
            this.hexList[destinationHex].hasRobber = true;
            this.hexList[destinationHex].vertices.forEach(vertexId => {
                if (this.vertexList[vertexId].owner !== player.none)
                    affectedPlayers.push(this.vertexList[vertexId].owner);
            });
            return {
                success: true, //robber successfully moved.
                affectedPlayers: affectedPlayers
            }
        } else {
            return {
                success: false, //must move the robber to a new hex
                affectedPlayers: affectedPlayers
            }
        }
    }

    printBoard() {
        console.log(`             ${this.getVertexSymbol(0)}     ${this.getVertexSymbol(1)}     ${this.getVertexSymbol(2)}`);
        console.log(`            ${this.getEdgeSymbol(0, 3) ?? '/'}   ${this.getEdgeSymbol(0, 4) ?? '\\'}   ${this.getEdgeSymbol(1, 4) ?? '/'}   ${this.getEdgeSymbol(1, 5) ?? '\\'}   ${this.getEdgeSymbol(2, 5) ?? '/'}   ${this.getEdgeSymbol(2, 6) ?? '\\'}`);
        console.log(`         ${this.getVertexSymbol(3)}     ${this.getVertexSymbol(4)}     ${this.getVertexSymbol(5)}     ${this.getVertexSymbol(6)}`);
        console.log(`          ${this.getEdgeSymbol(3, 7) ?? '|'}   ${this.getHexSymbol(0)}  ${this.getEdgeSymbol(4, 8) ?? '|'}   ${this.getHexSymbol(1)}  ${this.getEdgeSymbol(5, 9) ?? '|'}   ${this.getHexSymbol(2)}  ${this.getEdgeSymbol(6, 10) ?? '|'}`);
        console.log(`         ${this.getVertexSymbol(7)}     ${this.getVertexSymbol(8)}     ${this.getVertexSymbol(9)}     ${this.getVertexSymbol(10)}`);
        console.log(`        ${this.getEdgeSymbol(7, 11) ?? '/'}   ${this.getEdgeSymbol(7, 12) ?? '\\'}   ${this.getEdgeSymbol(8, 12) ?? '/'}   ${this.getEdgeSymbol(8, 13) ?? '\\'}   ${this.getEdgeSymbol(9, 13) ?? '/'}   ${this.getEdgeSymbol(9, 14) ?? '\\'}   ${this.getEdgeSymbol(10, 14) ?? '/'}   ${this.getEdgeSymbol(10, 15) ?? '\\'}`);
        console.log(`     ${this.getVertexSymbol(11)}     ${this.getVertexSymbol(12)}     ${this.getVertexSymbol(13)}     ${this.getVertexSymbol(14)}     ${this.getVertexSymbol(15)}`);
        console.log(`      ${this.getEdgeSymbol(11, 16) ?? '|'}   ${this.getHexSymbol(3)}  ${this.getEdgeSymbol(12, 17) ?? '|'}   ${this.getHexSymbol(4)}  ${this.getEdgeSymbol(13, 18) ?? '|'}   ${this.getHexSymbol(5)}  ${this.getEdgeSymbol(14, 19) ?? '|'}   ${this.getHexSymbol(6)}  ${this.getEdgeSymbol(15, 20) ?? '|'}`);
        console.log(`     ${this.getVertexSymbol(16)}     ${this.getVertexSymbol(17)}     ${this.getVertexSymbol(18)}     ${this.getVertexSymbol(19)}     ${this.getVertexSymbol(20)}`);
        console.log(`    ${this.getEdgeSymbol(16, 21) ?? '/'}   ${this.getEdgeSymbol(16, 22) ?? '\\'}   ${this.getEdgeSymbol(17, 22) ?? '/'}   ${this.getEdgeSymbol(17, 23) ?? '\\'}   ${this.getEdgeSymbol(18, 23) ?? '/'}   ${this.getEdgeSymbol(18, 24) ?? '\\'}   ${this.getEdgeSymbol(19, 24) ?? '/'}   ${this.getEdgeSymbol(19, 25) ?? '\\'}   ${this.getEdgeSymbol(20, 25) ?? '/'}   ${this.getEdgeSymbol(20, 26) ?? '\\'}`);
        console.log(` ${this.getVertexSymbol(21)}     ${this.getVertexSymbol(22)}     ${this.getVertexSymbol(23)}     ${this.getVertexSymbol(24)}     ${this.getVertexSymbol(25)}     ${this.getVertexSymbol(26)}`);
        console.log(`  ${this.getEdgeSymbol(21, 27) ?? '|'}   ${this.getHexSymbol(7)}  ${this.getEdgeSymbol(22, 28) ?? '|'}   ${this.getHexSymbol(8)}  ${this.getEdgeSymbol(23, 29) ?? '|'}   ${this.getHexSymbol(9)}  ${this.getEdgeSymbol(24, 30) ?? '|'}   ${this.getHexSymbol(10)}  ${this.getEdgeSymbol(25, 31) ?? '|'}   ${this.getHexSymbol(11)}  ${this.getEdgeSymbol(26, 32) ?? '|'}`);
        console.log(` ${this.getVertexSymbol(27)}     ${this.getVertexSymbol(28)}     ${this.getVertexSymbol(29)}     ${this.getVertexSymbol(30)}     ${this.getVertexSymbol(31)}     ${this.getVertexSymbol(32)}`);
        console.log(`    ${this.getEdgeSymbol(27, 33) ?? '\\'}   ${this.getEdgeSymbol(28, 33) ?? '/'}   ${this.getEdgeSymbol(28, 34) ?? '\\'}   ${this.getEdgeSymbol(29, 34) ?? '/'}   ${this.getEdgeSymbol(29, 35) ?? '\\'}   ${this.getEdgeSymbol(30, 35) ?? '/'}   ${this.getEdgeSymbol(30, 36) ?? '\\'}   ${this.getEdgeSymbol(31, 36) ?? '/'}   ${this.getEdgeSymbol(31, 37) ?? '\\'}   ${this.getEdgeSymbol(32, 37) ?? '/'}`);
        console.log(`     ${this.getVertexSymbol(33)}     ${this.getVertexSymbol(34)}     ${this.getVertexSymbol(35)}     ${this.getVertexSymbol(36)}     ${this.getVertexSymbol(37)}`);
        console.log(`      ${this.getEdgeSymbol(33, 38) ?? '|'}   ${this.getHexSymbol(12)}  ${this.getEdgeSymbol(34, 39) ?? '|'}   ${this.getHexSymbol(13)}  ${this.getEdgeSymbol(35, 40) ?? '|'}   ${this.getHexSymbol(14)}  ${this.getEdgeSymbol(36, 41) ?? '|'}   ${this.getHexSymbol(15)}  ${this.getEdgeSymbol(37, 42) ?? '|'}`);
        console.log(`     ${this.getVertexSymbol(38)}     ${this.getVertexSymbol(39)}     ${this.getVertexSymbol(40)}     ${this.getVertexSymbol(41)}     ${this.getVertexSymbol(42)}`);
        console.log(`        ${this.getEdgeSymbol(38, 43) ?? '\\'}   ${this.getEdgeSymbol(39, 43) ?? '/'}   ${this.getEdgeSymbol(39, 44) ?? '\\'}   ${this.getEdgeSymbol(40, 44) ?? '/'}   ${this.getEdgeSymbol(40, 45) ?? '\\'}   ${this.getEdgeSymbol(41, 45) ?? '/'}   ${this.getEdgeSymbol(41, 46) ?? '\\'}   ${this.getEdgeSymbol(42, 46) ?? '/'}  `);
        console.log(`         ${this.getVertexSymbol(43)}     ${this.getVertexSymbol(44)}     ${this.getVertexSymbol(45)}     ${this.getVertexSymbol(46)}`);
        console.log(`          ${this.getEdgeSymbol(43, 47) ?? '|'}   ${this.getHexSymbol(16)}  ${this.getEdgeSymbol(44, 48) ?? '|'}   ${this.getHexSymbol(17)}  ${this.getEdgeSymbol(45, 49) ?? '|'}   ${this.getHexSymbol(18)}  ${this.getEdgeSymbol(46, 50) ?? '|'}`);
        console.log(`         ${this.getVertexSymbol(47)}     ${this.getVertexSymbol(48)}     ${this.getVertexSymbol(49)}     ${this.getVertexSymbol(50)}`);
        console.log(`            ${this.getEdgeSymbol(47, 51) ?? '\\'}   ${this.getEdgeSymbol(48, 51) ?? '/'}   ${this.getEdgeSymbol(48, 52) ?? '\\'}   ${this.getEdgeSymbol(49, 52) ?? '/'}   ${this.getEdgeSymbol(49, 53) ?? '\\'}   ${this.getEdgeSymbol(50, 53) ?? '/'}`);
        console.log(`             ${this.getVertexSymbol(51)}     ${this.getVertexSymbol(52)}     ${this.getVertexSymbol(53)}`);
    }

}

{//test
     //let board = new Board();
}
