export default function Header(){

    const style={
        backgroundColor: '#10A95B',
        fontSize: '20px',
        color: 'transparent'
    }

    const title="QUESS"

    return (
        <header>
            <div className="game-title">
                {title.split("").map((letter,index) => <span key={index} className="key" style={style}>{letter}</span>)}
            </div>
            <h3 className="tag-line">A Quest to Guess!</h3>
            <p className="game-info">Find out the word in under 10 attempts</p>
        </header>
    )
}