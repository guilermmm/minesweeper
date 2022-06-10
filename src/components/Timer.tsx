import styled from '@emotion/styled'

interface Props {
  time: number
}

const formatTime = (sec: number) => {
  const minutes = Math.floor(sec / 60)
  const seconds = sec % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

const Timer: React.FC<Props> = ({ time }) => {
  return <Container>{formatTime(time)}</Container>
}

export default Timer

const Container = styled.div``
