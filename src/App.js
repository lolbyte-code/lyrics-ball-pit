import PhysicsImpl from "./PhysicsImpl"
import CssImpl from "./CssImpl"
import { defaultLyrics } from "./Lyrics"
import { useState } from "react";

const visToggle = false

function App() {
  const [lyrics, setLyrics] = useState(defaultLyrics);
  return (
    <div>
      <h1>Lyrics Generator</h1>
      <div>
        <textarea
          style={styles.lyricsInput}
          onChange={(e) => {
            setLyrics(e.target.value)
          }}
          value={lyrics}
        />
      </div>
      {visToggle ? <PhysicsImpl
        letters={getLetters(lyrics)}
        wallDepth={50}
        wallWidth={1000}
        letterScale={.3}
      /> : null}
      {!visToggle ? <CssImpl
        letters={getLetters(lyrics)}
        minDegree={0}
        maxDegree={360}
        letterWidth={40}
        minJitter={1}
        maxJitter={1.5}
        letterSeparation={11.9}
        fontSize={15}
      /> : null}
    </div>
  )
}

const getLetters = (lyrics) => {
  return lyrics.split("").filter(letter => letter.match(/[A-z]/g))
}

const styles = {
  lyricsInput: {
    width: '500px',
    height: '200px'
  }
}

export default App
