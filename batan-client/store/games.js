var game_mock = {
  'game 1': { id: 'longUID', board: {} },
  'game 2': { id: 'longUID2', board: {} },
}

export const state = () => ({
  games: game_mock,
  activeGame: 'game 1',
})

export const mutations = {
  changeGame(state, new_active_game) {
    if (Object.keys(state.games).includes(new_active_game)) {
      state.activeGame = new_active_game
    }
  },
  vuex_test(state, test_content) {
    console.log('vuex test received')
    console.log(test_content)
  },
  reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value)
      }
    }
    return value
  },
  parseJson(str) {
    return JSON.parse(str, this.reviver)
  },
}
