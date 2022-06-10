import styled from '@emotion/styled'
import { useContext } from 'react'
import { gameContext } from '../contexts/Game/GameContext'
import { ActionType } from '../contexts/Game/types'
import { Difficulty } from '../util/type'

interface Props {}

const Menu: React.FC<Props> = () => {
  const { dispatch } = useContext(gameContext)

  return (
    <Container>
      <Title>SELECT DIFFICULTY</Title>
      <Options>
        {Object.values(Difficulty).map(difficulty => {
          return (
            <Option>
              <Button
                onClick={() =>
                  dispatch([ActionType.SET_DIFFICULTY, difficulty])
                }
              >
                {difficulty}
              </Button>
            </Option>
          )
        })}
      </Options>
    </Container>
  )
}

export default Menu

const Container = styled.div``

const Title = styled.h1`
  margin-bottom: 4rem;
`
const Options = styled.ol`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Option = styled.li`
  list-style: none;
`

const Button = styled.button`
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: inherit;
  color: inherit;
`
