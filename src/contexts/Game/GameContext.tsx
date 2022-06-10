import React, { createContext } from 'react'
import { Reducer, useImmerReducer } from 'use-immer'
import {
  generateGrid,
  getConfigByDifficulty,
  getStartingMatrix,
  revealTile,
} from '../../util/functions'
import { Difficulty } from '../../util/type'
import {
  Action,
  ActionType,
  GameContext,
  GameState,
  State,
  Timer,
} from './types'

export const gameContext = createContext({} as GameContext)

const reducer: Reducer<State, Action> = (state, [type, payload]) => {
  switch (type) {
    case ActionType.REVEAL_TILE:
      revealTile(state.matrix, payload)
      return

    case ActionType.EXPLODE_BOMB:
      // pinta
      console.log('kabum', payload)
      return

    case ActionType.GAME_OVER:
      state.timer?.finish()
      //da o cu

      state.matrix.forEach(line =>
        line.forEach(tile => {
          tile.visible = true
        }),
      )
      return

    case ActionType.TRIGGER_FLAG:
      const [x, y] = payload
      const tile = state.matrix[x][y]
      tile.flag = !tile.flag
      return

    case ActionType.SET_DIFFICULTY:
      state.timer?.finish()
      state.gameState = GameState.NOT_STARTED
      state.difficulty = payload
      state.matrix = generateGrid(getConfigByDifficulty(payload))
      return

    case ActionType.START:
      state.timer = new Timer()

      const matrix = getStartingMatrix(
        getConfigByDifficulty(state.difficulty),
        payload,
      )

      state.matrix = matrix
      state.gameState = GameState.PLAYING

      revealTile(state.matrix, payload)

      return

    case ActionType.WIN:
      state.timer?.finish()
      console.log('parabens, pau no seu cu')
      return

    default:
      return
  }
}

const initialState: State = {
  matrix: [],
  gameState: GameState.NOT_STARTED,
  difficulty: Difficulty.EASY,
}

interface Props {
  children: React.ReactNode
}

const GameContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const handleLeftClick: GameContext['onTileLeftClick'] = (e, [x, y]) => {
    e.preventDefault()
    const tile = state.matrix[x][y]

    if (state.gameState === GameState.NOT_STARTED) {
      return dispatch([ActionType.START, [x, y]])
    }
    if (tile.flag) return

    if (tile.bomb) {
      dispatch([ActionType.EXPLODE_BOMB, [x, y]])
      return dispatch([ActionType.GAME_OVER])
    }
    if (!tile.visible) {
      dispatch([ActionType.REVEAL_TILE, [x, y]])
      const config = getConfigByDifficulty(state.difficulty)

      const all = config.height * config.width
      const { bombs } = config

      const revealed = state.matrix.reduce(
        (acc, currLine) =>
          acc + currLine.reduce((acc, curr) => acc + (curr.visible ? 1 : 0), 0),
        0,
      )

      if (revealed === all - bombs) {
        dispatch([ActionType.WIN])
      }

      return
    }
  }

  const handleRightClick: GameContext['onTileRightClick'] = (e, [x, y]) => {
    e.preventDefault()

    const tile = state.matrix[x][y]

    if (!tile.visible) {
      dispatch([ActionType.TRIGGER_FLAG, [x, y]])
    }
  }

  return (
    <gameContext.Provider
      value={{
        state,
        dispatch,
        onTileLeftClick: handleLeftClick,
        onTileRightClick: handleRightClick,
      }}
    >
      {children}
    </gameContext.Provider>
  )
}

export default GameContextProvider
