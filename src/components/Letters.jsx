export default function Letters(props){
    let letters = []
    const l = props.word.length
    for(let i=0; i<l; i++){
        letters.push(
            <span key={i} className="letter-placeholder">
                {props.guessedLetters.includes(props.word[i].toUpperCase()) ? props.word[i].toUpperCase() : !props.gameLost ? null : props.word[i].toUpperCase()}
            </span>)
    }
    return <section className="the-word"> {letters} </section>
}