export default function Header(){

    const style={
        backgroundColor: '#10A95B',
        fontSize: '20px',
        color: '#F9F4DA'
    }

    return (
        <header>
            <div className="game-title">
                <span className="key" style={style}>Q</span>
                <span className="key" style={style}>U</span>
                <span className="key" style={style}>E</span>
                <span className="key" style={style}>S</span>
                <span className="key" style={style}>S</span>
            </div>
            <h3 className="tag-line">A guessing quest!</h3>
            <p className="game-info">Find out the word in under 8 attempts</p>
        </header>
    )
}