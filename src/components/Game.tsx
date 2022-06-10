import styled from '@emotion/styled'
import { useContext, useEffect, useState } from 'react'
import { gameContext } from '../contexts/Game/GameContext'
import Grid from './Grid'
import Menu from './Menu'
import Timer from './Timer'

const Game: React.FC = () => {
  const {
    state: { timer },
  } = useContext(gameContext)
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => timer && setTime(timer.elapsed()), 1000)

    return () => {
      timer?.finish()
      clearInterval(interval)
      setTime(0)
    }
  }, [timer])

  return (
    <Container>
      <Menu />
      <Timer time={time} />
      <Grid />
    </Container>
  )
}

export default Game

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
