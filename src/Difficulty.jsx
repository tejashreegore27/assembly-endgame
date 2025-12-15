export default function Difficulty(props){
    return(
        <section className="difficulty-section">
            <div className="difficulty-labels">
                <span>Easy</span>
                <span>Medium</span>
                <span>Hard</span>
            </div>
            <input type="range" 
                    className="difficulty-slider"
                    min="0" max="2" value={props.difficulty}
                    onChange={(e) => props.setDifficulty(Number(e.target.value))}
            >
            </input>
        </section>
    )
}