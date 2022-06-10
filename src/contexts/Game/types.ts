import React from 'react'
import { Difficulty, GameTile, Position } from '../../util/type'

export enum GameState {
  NOT_STARTED,
  PLAYING,
  GAME_OVER,
}

export interface State {
  matrix: GameTile[][]
  gameState: GameState
  difficulty: Difficulty
  timer?: Timer
}

export interface GameContext {
  state: State
  dispatch: React.Dispatch<Action>
  onTileLeftClick: (e: React.MouseEvent, position: Position) => void
  onTileRightClick: (e: React.MouseEvent, position: Position) => void
}

export enum ActionType {
  REVEAL_TILE,
  GAME_OVER,
  EXPLODE_BOMB,
  TRIGGER_FLAG,
  SET_DIFFICULTY,
  START,
  WIN,
}

export type Action =
  | [ActionType.REVEAL_TILE, Position]
  | [ActionType.GAME_OVER]
  | [ActionType.EXPLODE_BOMB, Position]
  | [ActionType.TRIGGER_FLAG, Position]
  | [ActionType.SET_DIFFICULTY, Difficulty]
  | [ActionType.START, Position]
  | [ActionType.WIN]

export class Timer {
  private start: number
  private end?: number

  public constructor() {
    this.start = Date.now()
  }

  public elapsed(): number {
    return Math.floor(((this.end ?? Date.now()) - this.start) / 1000)
  }

  public finish(): void {
    this.end = Date.now()
  }
}
