import Vue from 'vue'

export const state = () => ({
  available_games: {},
  active_games: {},
  active_game: ''
})

export const mutations = {
  changeGame(state, new_active_game) {
    if (Object.keys(state.active_games).includes(String(new_active_game.game_id))){
      state.active_game = new_active_game;
    }
  },
  created(state, game) {
    // Updates available_games by overwriting game
    Vue.set(state.available_games, game.game_id, game);
    console.log(state.available_games);
  },
  active(state, game) {
    Vue.set(state.active_games, game.game_id, game);
    if (state.active_game == '') {
      state.active_game = game;
    }
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
