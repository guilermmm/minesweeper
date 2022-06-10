import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { gameContext } from '../contexts/Game/GameContext'
import Tile from './Tile'

const Grid = (): JSX.Element => {
  const {
    state: { matrix },
  } = useContext(gameContext)

  return (
    <div>
      {matrix.map((line, x) => (
        <Line>
          {line.map((tile, y) => (
            <Tile {...tile} position={[x, y]} />
          ))}
        </Line>
      ))}
    </div>
  )
}

export default Grid

const Line = styled.div`
  display: flex;
`
