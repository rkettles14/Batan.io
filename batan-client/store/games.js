var game_mock = {
  "game 1": {"id": "longUID", "board": {}},
  "game 2": {"id": "longUID2", "board": {}}
}

export const state = () => ({
  games: game_mock,
  available_games: new Map(),
  active_games: new Map(),
  activeGame: "game 1"
})

export const mutations = {
  changeGame(state, new_active_game) {
    if (Object.keys(state.games).includes(new_active_game)){
      state.activeGame = new_active_game;
    }
  },
  vuex_test(state, test_content) {
    console.log('vuex test received');
    console.log(test_content);
  },
  created(state, game) {
    // Updates available_games by overwriting game
    state.available_games.set(game.game_id, game);
  },
  active(state, game) {
    state.active_games.set(game.game_id, game);
    console.log(state.active_games);
  },
  joined(state, game) {
    // courtesy notice, no action taken until game is started
    // can maybe be listened for in snackbar?
    console.log(`You successfully joined the game.. ${game.game_id}`)
  },
  actionFailed(state, data) {
    // courtesy notice, no action taken
    // can maybe be listened for in snackbar?
    console.log(data.description);
  },
  turnStart(state, data) {
    console.log(data);
  }

}
