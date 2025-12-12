import Header from "./Header"
import Status from "./Status"
import Chip from "./Chip"
import { languages } from "./languages"
import { nanoid } from "nanoid"
import Letters from "./Letters"
import { useState } from "react"
import Keyboard from "./Keyboard"

export default function App(){

  const chips = languages.map(lang => {
    return <Chip key={nanoid()} name={lang.name} bg={lang.backgroundColor} color={lang.color}/>
  })

  const [word, setWord] = useState('react')
  const [keyboard, setKeyboard] = useState([],[],[])

  return (
    <>
      <Header />
      <Status />
      <section className="chips-section">
        {chips}
      </section>
      <Letters word={word}/>
      <Keyboard keyboard={keyboard}/>
      <button className="new-game-button">New Game</button>
    </>
  )
}