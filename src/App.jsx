import Header from "./Header"
import Status from "./Status"
import Chip from "./Chip"
import { nanoid } from "nanoid"
import Letters from "./Letters"
import { useState } from "react"
import Keyboard from "./Keyboard"
import { alphabets } from "./Alphabets"
import { words } from "./words"
import ReactConfetti from "react-confetti"

export default function App(){

  const [word, setWord] = useState(() => words[Math.floor(Math.random()*words.length)])
  const [keyboard, setKeyboard] = useState(alphabets)
  const [guessedLetters, setGuessedLetters] = useState([])
  const [lives, setLives] = useState(['❤️','❤️','❤️','❤️','❤️','❤️','❤️','❤️'])
  const [wordsUsed, setWordsUsed] = useState([])

  const wrongGuessCount = guessedLetters.filter(letter => !word.toUpperCase().includes(letter)).length
  const gameWon = word.toUpperCase().split("").every(letter => guessedLetters.includes(letter))
  const gameLost = wrongGuessCount >= lives.length
  const gameOver = gameWon || gameLost

  let status = ""
  let message = ""
  let bg = null

  if(gameOver && gameWon){
    status = "You win!"
    message = "Well done! 🎉"
    bg = '#10A95B'
  }

  if(gameOver && gameLost){
    status = "Game over!"
    message = `You can do better. Try again!`
    bg = '#BA2A2A'
    revealTheWord()
  }

  const chips = lives.map((life,index) => (
    index < wrongGuessCount ? <Chip key={nanoid()} name='💔'/> : <Chip key={nanoid()} name={life}/>
  ))

  function revealTheWord(){

  }

  function onKeyClick(letter){
    if(!guessedLetters.includes(letter)){
      setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, letter])
      const bg = word.toUpperCase().includes(letter) ? '#10A95B' : '#EC5D49';
      setKeyboard(prevKeyboard => prevKeyboard.map(key => 
          key.value === letter ? {...key, backgroundColor: bg} : key
      ))
    }  
  }

  function onNewGame(){
    setWordsUsed(prev => {
      let index;
      let nextWord;

      do {
        index = Math.floor(Math.random() * words.length);
        nextWord = words[index];
      } while (prev.includes(nextWord));

      setWord(nextWord);
      return [...prev, word];
    });
    setKeyboard(alphabets)
    setGuessedLetters([])
  }

  return (
    <>
      {gameWon && <ReactConfetti />}
      <Header />
      <Status 
        status={status}
        message={message}
        bg={bg}
      />
      <section className="chips-section">
        {chips}
      </section>
      <Letters word={word} guessedLetters={guessedLetters} gameLost={gameLost}/>
      <Keyboard keyboard={keyboard} handleKeyClick={onKeyClick} guessedLetters={guessedLetters} word={word} gameOver={gameOver}/>
      {gameOver && <button className="new-game-button" onClick={onNewGame}>New Game</button>}
    </>
  )
}