import {
  Difficulty,
  GameTile,
  GridConfig,
  gridConfigs,
  Position,
} from '../util/type'

export const getConfigByDifficulty = (difficulty: Difficulty) => {
  return gridConfigs[difficulty]
}

export const createMatrix = (width: number, height: number): null[][] => {
  return new Array(height).fill(new Array(width).fill(null))
}

export const draftBombs = ({ width, height, bombs }: GridConfig) => {
  const generatedNumbers: number[] = []

  const generateRandomNumber = (upperLimit: number): number => {
    const randomNumber = Math.floor(Math.random() * upperLimit)
    if (generatedNumbers.includes(randomNumber)) {
      return generateRandomNumber(upperLimit)
    }

    generatedNumbers.push(randomNumber)
    return randomNumber
  }

  const bombPositions = new Array(bombs)
    .fill(null)
    .map(() => generateRandomNumber(width * height))
    .map((n): Position => [Math.floor(n / width), Math.floor(n % width)])

  return bombPositions
}

export const plantBombs = (matrix: null[][], bombs: Position[]) => {
  const newMatrix: GameTile[][] = matrix.map((line, i) =>
    line.map((_, j) => ({
      number: 0,
      bomb: bombs.some(([x, y]) => x === i && y === j),
      visible: false,
      flag: false,
    })),
  )

  return newMatrix
}

export const getAdjacentIndexes = (x: number, y: number): Position[] => {
  return [
    [x - 1, y - 1],
    [x + 0, y - 1],
    [x + 1, y - 1],
    [x + 1, y + 0],
    [x + 1, y + 1],
    [x + 0, y + 1],
    [x - 1, y + 1],
    [x - 1, y + 0],
  ]
}

export const defineNumbers = (matrix: GameTile[][], [x, y]: Position) => {
  const adjacentIndexes = getAdjacentIndexes(x, y)

  adjacentIndexes.forEach(([x, y]) => {
    const tile = matrix[x]?.[y]
    if (tile) tile.number++
  })
}

export const fillNumbers = (matrix: GameTile[][]) => {
  matrix.forEach((line, x) =>
    line.forEach((tile, y) => {
      if (tile.bomb) defineNumbers(matrix, [x, y])
    }),
  )
}

export const generateGrid = (config: GridConfig) => {
  const matrix = createMatrix(config.width, config.height)
  const bombs = draftBombs(config)
  const plantedMatrix = plantBombs(matrix, bombs)
  fillNumbers(plantedMatrix)

  return plantedMatrix
}
export const generateFakeGrid = (config: GridConfig) => {
  const matrix = createMatrix(config.width, config.height)
  const plantedMatrix = plantBombs(matrix, [])

  return plantedMatrix
}

export const revealTile = (matrix: GameTile[][], [x, y]: Position): void => {
  const tile = matrix[x]?.[y]
  if (!tile || tile?.visible || tile?.flag) return

  tile.visible = true
  if (tile.number === 0 && !tile.bomb) {
    getAdjacentIndexes(x, y).forEach(position => revealTile(matrix, position))
  }
}

export const getStartingMatrix = (
  config: GridConfig,
  [x, y]: Position,
): GameTile[][] => {
  const matrix = generateGrid(config)

  if (matrix[x][y].number || matrix[x][y].bomb) {
    return getStartingMatrix(config, [x, y])
  }
  return matrix
}
