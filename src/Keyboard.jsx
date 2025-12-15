export default function Keyboard(props){

    const keys = props.keyboard.map(key => 
            <button 
                disabled={props.gameOver}
                key={key.value} 
                className="key" 
                onClick={() => props.handleKeyClick(key.value)}
                style={{
                    backgroundColor: key.backgroundColor,
                    opacity: props.gameOver ? 0.5 : 1
                }}
            >
                {key.value}
            </button>)
    return(
        <section className="keyboard">
            {keys}
        </section>
    )
}