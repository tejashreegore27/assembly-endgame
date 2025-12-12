export default function Letters(props){
    console.log(props)
    let letters = []
    const l = props.word.length
    for(let i=0; i<l; i++){
        console.log(`Adding letter ${props.word[i]}`)
        letters.push(
            <span key={i} className="letter-placeholder">
                {props.word[i].toUpperCase()}
            </span>)
    }
    return <section className="the-word"> {letters} </section>
}