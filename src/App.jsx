import Header from "./components/Header"
import Status from "./components/Status"
import Chip from "./components/Chip"
import { nanoid } from "nanoid"
import Letters from "./components/Letters"
import { useState, useEffect } from "react"
import Keyboard from "./components/Keyboard"
import { alphabets } from "./utils/Alphabets"
import { words } from "./utils/words"
import ReactConfetti from "react-confetti"
import Difficulty from "./components/Difficulty"

export default function App(){

  const [word, setWord] = useState(() => words[Math.floor(Math.random()*words.length)])
  const [keyboard, setKeyboard] = useState(alphabets)
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wordsUsed, setWordsUsed] = useState([])
  const [difficulty, setDifficulty] = useState(1)
  const [gameStarted, setGameStarted] = useState(false)

   // Initialize from localStorage or default to 0
  const [gamesWon, setGamesWon] = useState(() => {
    const saved = localStorage.getItem('gamesWon')
    return saved ? Number(saved) : 0
  })
  
  const [gamesLost, setGamesLost] = useState(() => {
    const saved = localStorage.getItem('gamesLost')
    return saved ? Number(saved) : 0
  })

  const maxLives = difficulty === 0 ? 10 : difficulty === 2 ? 6 : 8

  const wrongGuessCount = guessedLetters.filter(letter => !word.toUpperCase().includes(letter)).length
  const gameWon = word.toUpperCase().split("").every(letter => guessedLetters.includes(letter))
  const gameLost = wrongGuessCount >= maxLives
  const gameOver = gameWon || gameLost
  const isResetDisabled = (gameStarted && !gameOver) || (gamesWon === 0 && gamesLost === 0)

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
    message = `So close! Give it another shot?`
    bg = '#BA2A2A'
  }

  // when there are 1 or more guessedLetters, game is started.
  useEffect(() => {
    if(guessedLetters.length > 0){
      setGameStarted(true)
    }
  }, [guessedLetters])

  // update gamesWon and gamesLost values when game is either won or lost
  useEffect(() => {
    if(gameWon){
      setGamesWon(prev => prev + 1)
    }
    else if(gameLost){
      setGamesLost(prev => prev + 1)
    }
  }, [gameWon, gameLost])

  // update local storage when gamesWon and gamesLost change
  useEffect(() => {
    localStorage.setItem('gamesWon', gamesWon)
  }, [gamesWon])

  useEffect(() => {
    localStorage.setItem('gamesLost', gamesLost)
  }, [gamesLost])

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
    setDifficulty(1);
    setGameStarted(false);
  }

  function resetScore(){
    setGamesWon(0)
    setGamesLost(0)
  }

  return (
    <>
      {gameWon && <ReactConfetti recycle={false} numberOfPieces={500} gravity={0.4}/>}
      <Header />
      <Status 
        gamesWon={gamesWon}
        gamesLost={gamesLost}
        status={status}
        message={message}
        bg={bg}
      />
      <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} gameStarted={gameStarted}/> 
      <section className="chips-section">
        {chips}
      </section>
      <Letters word={word} guessedLetters={guessedLetters} gameLost={gameLost}/>
      <Keyboard keyboard={keyboard} handleKeyClick={onKeyClick} guessedLetters={guessedLetters} word={word} gameOver={gameOver}/>
      <div className="the-buttons">
        <button disabled={!gameOver} className="the-button" onClick={onNewGame}>New Game</button>
        <button disabled={isResetDisabled} onClick={resetScore} className="the-button">Reset Score</button>
      </div>
    </>  
  )
}