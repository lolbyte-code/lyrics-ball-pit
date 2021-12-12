import './css/CssImpl.css'

const CssImpl = (props) => {
  const Letters = shuffle(props.letters).map((letter, index) => {
    const letterStyle = (index) => {
      const degree = Math.floor(Math.random() * (props.maxDegree - props.minDegree) + props.minDegree)
      const jitterX = Math.floor(Math.random() * (props.maxJitter - props.minJitter) + props.minJitter)
      const jitterY = Math.floor(Math.random() * (props.maxJitter - props.minJitter) + props.minJitter)
      return {
        transform: `rotate(${degree}deg)`,
        position: 'absolute',
        left: (index % props.letterWidth) * props.letterSeparation * jitterX,
        top: (index / props.letterWidth) * props.letterSeparation * jitterY,
        fontFamily: 'PtSerif-Bold',
        fontSize: `${props.fontSize}px`,
      }
    }
    return (
      <p key={index} style={letterStyle(index)}>{letter}</p>
    )
  })
  return (
    <div style={{ margin: '10px', position: 'relative' }}>
      {Letters}
    </div>
  )
}

const shuffle = (arr) => {
  let currentIndex = arr.length, randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
  }
  return arr
}

export default CssImpl
