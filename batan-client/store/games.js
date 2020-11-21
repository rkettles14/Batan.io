var game_mock = {
  "game 1": {"id": "longUID", "board": {}},
  "game 2": {"id": "longUID2", "board": {}}
}

export const state = () => ({
  games: game_mock,
  activeGame: "game 1"
})

export const mutations = {
  changeGame(state, new_active_game) {
    if (Object.keys(state.games).includes(new_active_game)){
      state.activeGame = new_active_game;
    }
  },
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
