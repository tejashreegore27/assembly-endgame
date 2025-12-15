import Header from "./Header"
import Status from "./Status"
import Chip from "./Chip"
import { nanoid } from "nanoid"
import Letters from "./Letters"
import { useState, useEffect } from "react"
import Keyboard from "./Keyboard"
import { alphabets } from "./Alphabets"
import { words } from "./words"
import ReactConfetti from "react-confetti"
import Difficulty from "./Difficulty"

export default function App(){

  const [word, setWord] = useState(() => words[Math.floor(Math.random()*words.length)])
  const [keyboard, setKeyboard] = useState(alphabets)
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wordsUsed, setWordsUsed] = useState([])
  const [difficulty, setDifficulty] = useState(1)
  const [gamesWon, setGamesWon] = useState(0)
  const [gamesLost, setGamesLost] = useState(0)

  const maxLives = difficulty === 0 ? 10 : difficulty === 2 ? 6 : 8

  const wrongGuessCount = guessedLetters.filter(letter => !word.toUpperCase().includes(letter)).length
  const gameWon = word.toUpperCase().split("").every(letter => guessedLetters.includes(letter))
  const gameLost = wrongGuessCount >= maxLives
  const gameOver = gameWon || gameLost

  const chips = Array.from({ length: maxLives }, (_, index) => ( 
    index < wrongGuessCount ? 
    <Chip key= {nanoid()} name='💔'/> : 
    <Chip key={nanoid()} name='❤️'/> 
  ))

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
  }

  useEffect(() => {
    if(gameWon){
      setGamesWon(prev => prev + 1)
    }
    else if(gameLost){
      setGamesLost(prev => prev + 1)
    }
  }, [gameWon, gameLost])

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
    let nextWord;
    do {
      nextWord = words[Math.floor(Math.random() * words.length)];
    } while (wordsUsed.includes(nextWord));
    setWordsUsed(prev => [...prev, word]);
    setWord(nextWord);
    setKeyboard(alphabets);
    setGuessedLetters([]);
  }

  return (
    <>
      {gameWon && <ReactConfetti />}
      <Header />
      <Status 
        gamesWon={gamesWon}
        gamesLost={gamesLost}
        status={status}
        message={message}
        bg={bg}
      />
      <Difficulty difficulty={difficulty} setDifficulty={setDifficulty}/> 
      <section className="chips-section">
        {chips}
      </section>
      <Letters word={word} guessedLetters={guessedLetters} gameLost={gameLost}/>
      <Keyboard keyboard={keyboard} handleKeyClick={onKeyClick} guessedLetters={guessedLetters} word={word} gameOver={gameOver}/>
      {gameOver && <button className="new-game-button" onClick={onNewGame}>New Game</button>}
    </>  
  )
}