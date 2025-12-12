export default function Keyboard(props){
    const alphabets = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    const keys = alphabets.map(alphabet => 
            <span key={alphabet} className="key">
                {alphabet}
            </span>)
    return(
        <section className="keyboard">
            {keys}
        </section>
    )
}