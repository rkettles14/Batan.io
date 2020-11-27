export default {
  players: new Map(),
  games: new Map(),
  newGame() {

  },
  
}

/*
players: uid -> {
  online: boolean,
  games: [
    game_id1,
    game_id37,
    ..
  ],

}
*/

/*
games: game_id -> {
  players: [
    (uid1, color1),
    (uid2, color2),
    ..
  ],
  game_owner: uid,
  game_obj: obj
}
*/
