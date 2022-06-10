export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export const gridConfigs: Record<Difficulty, GridConfig> = {
  [Difficulty.EASY]: {
    width: 10,
    height: 10,
    bombs: 10,
  },
  [Difficulty.MEDIUM]: {
    width: 16,
    height: 16,
    bombs: 40,
  },
  [Difficulty.HARD]: {
    width: 30,
    height: 16,
    bombs: 99,
  },
}

export interface GridConfig {
  width: number
  height: number
  bombs: number
}

export type Position = [x: number, y: number]

export interface GameTile {
  bomb: boolean
  number: number
  visible: boolean
  flag: boolean
}

export interface Props {
  difficulty: Difficulty
}
