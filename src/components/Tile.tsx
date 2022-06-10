import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { gameContext } from '../contexts/Game/GameContext'
import { GameTile, Position } from '../util/type'

interface Props extends GameTile {
  position: Position
}

const renderTileContent = ({ bomb, flag, number, visible }: GameTile) => {
  if (flag) return '🚩'
  if (!visible) return ''
  if (bomb) return '💣'
  if (visible && number === 0) return ''
  return number.toString()
}

const Tile = ({ bomb, number, visible, position, flag }: Props) => {
  const { onTileLeftClick, onTileRightClick } = useContext(gameContext)

  return (
    <SquareDiv
      visible={visible}
      onClick={e => onTileLeftClick(e, position)}
      onContextMenu={e => onTileRightClick(e, position)}
    >
      {renderTileContent({ bomb, number, visible, flag })}
    </SquareDiv>
  )
}

export default Tile

const SquareDiv = styled.div<Pick<Props, 'visible'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.visible ? '#474747c9' : '#f0f8ff6c')};
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin: 2px;
  &:hover {
    background-color: #f0f8ffb0;
    color: black;
    color: #474747af;
  }
`
