import styled from '@emotion/styled'
import Game from './components/Game'
import GameContextProvider from './contexts/Game/GameContext'

function App() {
  return (
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  )
}

export default App

const Container = styled.div``
