var Vertex = (function () {
    function Vertex(id, owner, status) {
        this.id = id;
        this.owner = owner;
        this.status = status;
    }
    return Vertex;
}());
var Hex = (function () {
    function Hex() {
    }
    return Hex;
}());
var Board = (function () {
    function Board() {
        this.roadsMap = new Map();
        this.vertexList = [];
        this.hexList = [];
        this.initStandardBoard();
        this.initHexagons();
    }
    Board.prototype.initStandardBoard = function () {
        var vertices = 54;
        for (var i = 0; i < vertices; i++) {
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
    };
    Board.prototype.addVertex = function () {
        var id = this.vertexList.length;
        this.vertexList.push(new Vertex(id, player.none, vertexStatus.open));
        this.roadsMap.set(id, []);
    };
    Board.prototype.addEdge = function (v, w) {
        this.roadsMap.get(v).push([w, player.none]);
        this.roadsMap.get(w).push([v, player.none]);
    };
    Board.prototype.getEdge = function (v, w) {
        var edges = this.roadsMap.get(v);
        if (!edges) {
            return null;
        }
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            if (edge[0] == w) {
                return edge;
            }
        }
        return null;
    };
    Board.prototype.setEdge = function (v, w, val) {
        var edges = this.roadsMap.get(v);
        if (!edges) {
            return;
        }
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            if (edge[0] == w) {
                edge[1] = val;
            }
        }
    };
    Board.prototype.randomizeHexResources = function () {
        for (var i = 0; i < this.hexList.length; i++) {
            if (i < 4) {
                this.hexList[i].resourceType = resourceType.sheep;
            }
            else if (i >= 4 && i < 8) {
                this.hexList[i].resourceType = resourceType.wheat;
            }
            else if (i >= 8 && i < 12) {
                this.hexList[i].resourceType = resourceType.wood;
            }
            else if (i >= 12 && i < 15) {
                this.hexList[i].resourceType = resourceType.ore;
            }
            else if (i >= 15 && i < 18) {
                this.hexList[i].resourceType = resourceType.brick;
            }
            else {
                this.hexList[i].resourceType = resourceType.none;
            }
        }
        var currentIndex = this.hexList.length;
        var temporaryValue;
        var randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.hexList[currentIndex];
            this.hexList[currentIndex] = this.hexList[randomIndex];
            this.hexList[randomIndex] = temporaryValue;
        }
    };
    Board.prototype.setHexValues = function () {
        var outerRing = [0, 1, 2, 6, 11, 15, 18, 17, 16, 12, 7, 3];
        var innerRing = [4, 5, 10, 14, 13, 8];
        var center = 9;
        var entryMap = new Map();
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
        var balancedValues = [5, 2, 6, 10, 9, 4, 3, 8, 11, 5, 8, 4, 3, 6, 10, 11, 12, 9];
        var index = Math.floor(Math.random() * 12);
        var entryPoint = index;
        var bvIndex = 0;
        var j = 0;
        for (var i = 0; i < outerRing.length; i++) {
            if (this.hexList[outerRing[index]].resourceType !== resourceType.none) {
                this.hexList[outerRing[index]].value = balancedValues[bvIndex];
                bvIndex++;
            }
            else {
                this.hexList[outerRing[index]].value = -1;
            }
            index++;
            if (index == outerRing.length) {
                index = 0;
            }
        }
        index = innerRing.indexOf(entryMap.get(outerRing[entryPoint]));
        for (var i = 0; i < innerRing.length; i++) {
            if (this.hexList[innerRing[index]].resourceType !== resourceType.none) {
                this.hexList[innerRing[index]].value = balancedValues[bvIndex];
                bvIndex++;
            }
            else {
                this.hexList[innerRing[index]].value = -1;
            }
            index++;
            if (index == innerRing.length) {
                index = 0;
            }
        }
        if (this.hexList[center].resourceType !== resourceType.none) {
            this.hexList[center].value = balancedValues[bvIndex];
        }
        else {
            this.hexList[center].value = -1;
        }
    };
    Board.prototype.setVertices = function () {
    };
    Board.prototype.initHexagons = function () {
        var hexAmt = 19;
        for (var i = 0; i < hexAmt; i++) {
            this.hexList[i] = new Hex();
        }
        this.randomizeHexResources();
        this.setHexValues();
    };
    Board.prototype.getEdgeSymbol = function (v, w) {
        var symbol = player[this.getEdge(v, w)[1]].charAt(0).toLowerCase();
        if (symbol == "n") {
            return null;
        }
        return symbol;
    };
    Board.prototype.getVertexSymbol = function (v) {
        var symbol = player[this.vertexList[v].owner].charAt(0).toUpperCase();
        if (this.vertexList[v].status === vertexStatus.city) {
            symbol = "[" + symbol + "]";
        }
        else {
            symbol = " " + symbol + " ";
        }
        if (symbol == " N ") {
            return " * ";
        }
        return symbol;
    };
    Board.prototype.getHexSymbol = function (v) {
        return ("" + this.hexList[v].value).padStart(2, '0');
    };
    Board.prototype.addRoad = function (startVertexId, endVertexId, owner) {
        var edge = this.getEdge(startVertexId, endVertexId);
        if (!edge) {
            return;
        }
        if (edge[1] !== player.none) {
            return;
        }
        var startVertex = this.roadsMap.get(startVertexId);
        var isAdjacentRoad = false;
        for (var i = 0; i < startVertex.length; i++) {
            if (startVertex[i][1] === owner) {
                isAdjacentRoad = true;
            }
        }
        if (this.vertexList[startVertexId].owner === owner || isAdjacentRoad) {
            this.setEdge(startVertexId, endVertexId, owner);
            this.setEdge(endVertexId, startVertexId, owner);
        }
    };
    Board.prototype.addSettlement = function (indexId, owner) {
        if (!this.vertexList[indexId]) {
            return;
        }
        if (this.vertexList[indexId].status === vertexStatus.open) {
            this.vertexList[indexId].status = vertexStatus.settlement;
            this.vertexList[indexId].owner = owner;
            var adjacent = this.roadsMap.get(indexId);
            for (var i = 0; i < adjacent.length; i++) {
                this.vertexList[adjacent[i][0]].status = vertexStatus.blocked;
            }
        }
        return;
    };
    Board.prototype.addCity = function (indexId, owner) {
        if (!this.vertexList[indexId]) {
            return;
        }
        if (this.vertexList[indexId].status === vertexStatus.settlement && this.vertexList[indexId].owner === owner) {
            this.vertexList[indexId].status = vertexStatus.city;
        }
    };
    Board.prototype.printBoard = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47;
        console.log("             " + this.getVertexSymbol(0) + "     " + this.getVertexSymbol(1) + "     " + this.getVertexSymbol(2));
        console.log("            " + ((_a = this.getEdgeSymbol(1, 4)) !== null && _a !== void 0 ? _a : '/') + "   " + ((_b = this.getEdgeSymbol(1, 5)) !== null && _b !== void 0 ? _b : '\\') + "   " + ((_c = this.getEdgeSymbol(1, 4)) !== null && _c !== void 0 ? _c : '/') + "   " + ((_d = this.getEdgeSymbol(1, 5)) !== null && _d !== void 0 ? _d : '\\') + "   " + ((_e = this.getEdgeSymbol(1, 4)) !== null && _e !== void 0 ? _e : '/') + "   " + ((_f = this.getEdgeSymbol(1, 5)) !== null && _f !== void 0 ? _f : '\\'));
        console.log("         " + this.getVertexSymbol(3) + "     " + this.getVertexSymbol(4) + "     " + this.getVertexSymbol(5) + "     " + this.getVertexSymbol(6));
        console.log("          " + ((_g = this.getEdgeSymbol(3, 7)) !== null && _g !== void 0 ? _g : '|') + "   " + this.getHexSymbol(0) + "  " + ((_h = this.getEdgeSymbol(4, 8)) !== null && _h !== void 0 ? _h : '|') + "   " + this.getHexSymbol(1) + "  " + ((_j = this.getEdgeSymbol(5, 9)) !== null && _j !== void 0 ? _j : '|') + "   " + this.getHexSymbol(2) + "  " + ((_k = this.getEdgeSymbol(6, 10)) !== null && _k !== void 0 ? _k : '|'));
        console.log("         " + this.getVertexSymbol(7) + "     " + this.getVertexSymbol(8) + "     " + this.getVertexSymbol(9) + "     " + this.getVertexSymbol(10));
        console.log("        " + ((_l = this.getEdgeSymbol(7, 11)) !== null && _l !== void 0 ? _l : '/') + "   " + ((_m = this.getEdgeSymbol(7, 12)) !== null && _m !== void 0 ? _m : '\\') + "   " + ((_o = this.getEdgeSymbol(8, 12)) !== null && _o !== void 0 ? _o : '/') + "   " + ((_p = this.getEdgeSymbol(8, 13)) !== null && _p !== void 0 ? _p : '\\') + "   " + ((_q = this.getEdgeSymbol(9, 13)) !== null && _q !== void 0 ? _q : '/') + "   " + ((_r = this.getEdgeSymbol(9, 14)) !== null && _r !== void 0 ? _r : '\\') + "   " + ((_s = this.getEdgeSymbol(10, 14)) !== null && _s !== void 0 ? _s : '/') + "   " + ((_t = this.getEdgeSymbol(10, 15)) !== null && _t !== void 0 ? _t : '\\'));
        console.log("     " + this.getVertexSymbol(11) + "     " + this.getVertexSymbol(12) + "     " + this.getVertexSymbol(13) + "     " + this.getVertexSymbol(14) + "     " + this.getVertexSymbol(15));
        console.log("      " + ((_u = this.getEdgeSymbol(11, 16)) !== null && _u !== void 0 ? _u : '|') + "   " + this.getHexSymbol(3) + "  " + ((_v = this.getEdgeSymbol(12, 17)) !== null && _v !== void 0 ? _v : '|') + "   " + this.getHexSymbol(4) + "  " + ((_w = this.getEdgeSymbol(13, 18)) !== null && _w !== void 0 ? _w : '|') + "   " + this.getHexSymbol(5) + "  " + ((_x = this.getEdgeSymbol(14, 19)) !== null && _x !== void 0 ? _x : '|') + "   " + this.getHexSymbol(6) + "  " + ((_y = this.getEdgeSymbol(15, 20)) !== null && _y !== void 0 ? _y : '|'));
        console.log("     " + this.getVertexSymbol(16) + "     " + this.getVertexSymbol(17) + "     " + this.getVertexSymbol(18) + "     " + this.getVertexSymbol(19) + "     " + this.getVertexSymbol(20));
        console.log("    " + ((_z = this.getEdgeSymbol(16, 21)) !== null && _z !== void 0 ? _z : '/') + "   " + ((_0 = this.getEdgeSymbol(16, 22)) !== null && _0 !== void 0 ? _0 : '\\') + "   " + ((_1 = this.getEdgeSymbol(17, 22)) !== null && _1 !== void 0 ? _1 : '/') + "   " + ((_2 = this.getEdgeSymbol(17, 23)) !== null && _2 !== void 0 ? _2 : '\\') + "   " + ((_3 = this.getEdgeSymbol(18, 23)) !== null && _3 !== void 0 ? _3 : '/') + "   " + ((_4 = this.getEdgeSymbol(18, 24)) !== null && _4 !== void 0 ? _4 : '\\') + "   " + ((_5 = this.getEdgeSymbol(19, 24)) !== null && _5 !== void 0 ? _5 : '/') + "   " + ((_6 = this.getEdgeSymbol(19, 25)) !== null && _6 !== void 0 ? _6 : '\\') + "   " + ((_7 = this.getEdgeSymbol(20, 25)) !== null && _7 !== void 0 ? _7 : '/') + "   " + ((_8 = this.getEdgeSymbol(20, 26)) !== null && _8 !== void 0 ? _8 : '\\'));
        console.log(" " + this.getVertexSymbol(21) + "     " + this.getVertexSymbol(22) + "     " + this.getVertexSymbol(23) + "     " + this.getVertexSymbol(24) + "     " + this.getVertexSymbol(25) + "     " + this.getVertexSymbol(26));
        console.log("  " + ((_9 = this.getEdgeSymbol(21, 27)) !== null && _9 !== void 0 ? _9 : '|') + "   " + this.getHexSymbol(7) + "  " + ((_10 = this.getEdgeSymbol(22, 28)) !== null && _10 !== void 0 ? _10 : '|') + "   " + this.getHexSymbol(8) + "  " + ((_11 = this.getEdgeSymbol(23, 29)) !== null && _11 !== void 0 ? _11 : '|') + "   " + this.getHexSymbol(9) + "  " + ((_12 = this.getEdgeSymbol(24, 30)) !== null && _12 !== void 0 ? _12 : '|') + "   " + this.getHexSymbol(10) + "  " + ((_13 = this.getEdgeSymbol(25, 31)) !== null && _13 !== void 0 ? _13 : '|') + "   " + this.getHexSymbol(11) + "  " + ((_14 = this.getEdgeSymbol(26, 32)) !== null && _14 !== void 0 ? _14 : '|'));
        console.log(" " + this.getVertexSymbol(27) + "     " + this.getVertexSymbol(28) + "     " + this.getVertexSymbol(29) + "     " + this.getVertexSymbol(30) + "     " + this.getVertexSymbol(31) + "     " + this.getVertexSymbol(32));
        console.log("    " + ((_15 = this.getEdgeSymbol(27, 33)) !== null && _15 !== void 0 ? _15 : '\\') + "   " + ((_16 = this.getEdgeSymbol(28, 33)) !== null && _16 !== void 0 ? _16 : '/') + "   " + ((_17 = this.getEdgeSymbol(28, 34)) !== null && _17 !== void 0 ? _17 : '\\') + "   " + ((_18 = this.getEdgeSymbol(29, 34)) !== null && _18 !== void 0 ? _18 : '/') + "   " + ((_19 = this.getEdgeSymbol(29, 35)) !== null && _19 !== void 0 ? _19 : '\\') + "   " + ((_20 = this.getEdgeSymbol(30, 35)) !== null && _20 !== void 0 ? _20 : '/') + "   " + ((_21 = this.getEdgeSymbol(30, 36)) !== null && _21 !== void 0 ? _21 : '\\') + "   " + ((_22 = this.getEdgeSymbol(31, 36)) !== null && _22 !== void 0 ? _22 : '/') + "   " + ((_23 = this.getEdgeSymbol(31, 37)) !== null && _23 !== void 0 ? _23 : '\\') + "   " + ((_24 = this.getEdgeSymbol(32, 37)) !== null && _24 !== void 0 ? _24 : '/'));
        console.log("     " + this.getVertexSymbol(33) + "     " + this.getVertexSymbol(34) + "     " + this.getVertexSymbol(35) + "     " + this.getVertexSymbol(36) + "     " + this.getVertexSymbol(37));
        console.log("      " + ((_25 = this.getEdgeSymbol(33, 38)) !== null && _25 !== void 0 ? _25 : '|') + "   " + this.getHexSymbol(12) + "  " + ((_26 = this.getEdgeSymbol(34, 39)) !== null && _26 !== void 0 ? _26 : '|') + "   " + this.getHexSymbol(13) + "  " + ((_27 = this.getEdgeSymbol(35, 40)) !== null && _27 !== void 0 ? _27 : '|') + "   " + this.getHexSymbol(14) + "  " + ((_28 = this.getEdgeSymbol(36, 41)) !== null && _28 !== void 0 ? _28 : '|') + "   " + this.getHexSymbol(15) + "  " + ((_29 = this.getEdgeSymbol(37, 42)) !== null && _29 !== void 0 ? _29 : '|'));
        console.log("     " + this.getVertexSymbol(38) + "     " + this.getVertexSymbol(39) + "     " + this.getVertexSymbol(40) + "     " + this.getVertexSymbol(41) + "     " + this.getVertexSymbol(42));
        console.log("        " + ((_30 = this.getEdgeSymbol(38, 43)) !== null && _30 !== void 0 ? _30 : '\\') + "   " + ((_31 = this.getEdgeSymbol(39, 43)) !== null && _31 !== void 0 ? _31 : '/') + "   " + ((_32 = this.getEdgeSymbol(39, 44)) !== null && _32 !== void 0 ? _32 : '\\') + "   " + ((_33 = this.getEdgeSymbol(40, 44)) !== null && _33 !== void 0 ? _33 : '/') + "   " + ((_34 = this.getEdgeSymbol(40, 45)) !== null && _34 !== void 0 ? _34 : '\\') + "   " + ((_35 = this.getEdgeSymbol(41, 45)) !== null && _35 !== void 0 ? _35 : '/') + "   " + ((_36 = this.getEdgeSymbol(41, 46)) !== null && _36 !== void 0 ? _36 : '\\') + "   " + ((_37 = this.getEdgeSymbol(42, 46)) !== null && _37 !== void 0 ? _37 : '/') + "  ");
        console.log("         " + this.getVertexSymbol(43) + "     " + this.getVertexSymbol(44) + "     " + this.getVertexSymbol(45) + "     " + this.getVertexSymbol(46));
        console.log("          " + ((_38 = this.getEdgeSymbol(43, 47)) !== null && _38 !== void 0 ? _38 : '|') + "   " + this.getHexSymbol(16) + "  " + ((_39 = this.getEdgeSymbol(44, 48)) !== null && _39 !== void 0 ? _39 : '|') + "   " + this.getHexSymbol(17) + "  " + ((_40 = this.getEdgeSymbol(45, 49)) !== null && _40 !== void 0 ? _40 : '|') + "   " + this.getHexSymbol(18) + "  " + ((_41 = this.getEdgeSymbol(46, 50)) !== null && _41 !== void 0 ? _41 : '|'));
        console.log("         " + this.getVertexSymbol(47) + "     " + this.getVertexSymbol(48) + "     " + this.getVertexSymbol(49) + "     " + this.getVertexSymbol(50));
        console.log("            " + ((_42 = this.getEdgeSymbol(47, 51)) !== null && _42 !== void 0 ? _42 : '\\') + "   " + ((_43 = this.getEdgeSymbol(48, 51)) !== null && _43 !== void 0 ? _43 : '/') + "   " + ((_44 = this.getEdgeSymbol(48, 52)) !== null && _44 !== void 0 ? _44 : '\\') + "   " + ((_45 = this.getEdgeSymbol(49, 52)) !== null && _45 !== void 0 ? _45 : '/') + "   " + ((_46 = this.getEdgeSymbol(49, 53)) !== null && _46 !== void 0 ? _46 : '\\') + "   " + ((_47 = this.getEdgeSymbol(50, 53)) !== null && _47 !== void 0 ? _47 : '/'));
        console.log("             " + this.getVertexSymbol(51) + "     " + this.getVertexSymbol(51) + "     " + this.getVertexSymbol(53));
    };
    return Board;
}());
var vertexStatus;
(function (vertexStatus) {
    vertexStatus[vertexStatus["open"] = 0] = "open";
    vertexStatus[vertexStatus["settlement"] = 1] = "settlement";
    vertexStatus[vertexStatus["city"] = 2] = "city";
    vertexStatus[vertexStatus["blocked"] = 3] = "blocked";
})(vertexStatus || (vertexStatus = {}));
var player;
(function (player) {
    player[player["none"] = 0] = "none";
    player[player["red"] = 1] = "red";
    player[player["white"] = 2] = "white";
    player[player["blue"] = 3] = "blue";
    player[player["orange"] = 4] = "orange";
})(player || (player = {}));
var resourceType;
(function (resourceType) {
    resourceType[resourceType["none"] = 0] = "none";
    resourceType[resourceType["sheep"] = 1] = "sheep";
    resourceType[resourceType["wheat"] = 2] = "wheat";
    resourceType[resourceType["wood"] = 3] = "wood";
    resourceType[resourceType["ore"] = 4] = "ore";
    resourceType[resourceType["brick"] = 5] = "brick";
})(resourceType || (resourceType = {}));
{
    var board = new Board();
    board.addSettlement(0, player.blue);
    board.addSettlement(8, player.red);
    board.addRoad(8, 12, player.red);
    board.addRoad(8, 4, player.red);
    board.addCity(0, player.blue);
    board.addSettlement(16, player.white);
    board.addSettlement(21, player.white);
    board.printBoard();
}
//# sourceMappingURL=board.js.map