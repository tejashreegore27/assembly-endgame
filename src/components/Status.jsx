export default function Status(props){

    return(
        <section className="status-bar">
            <div className="score">
                <span className="score-title">Won</span>
                <span className="score-value">{props.gamesWon}</span>
            </div>
            <div className="status" 
                style={{
                    backgroundColor: props.bg
                }}
            >
                <span className="status-line-1">{props.status}</span><br />
                <span className="status-line-2">{props.message}</span>
            </div>
            <div className="score">
                <span className="score-title">Lost</span>
                <span className="score-value">{props.gamesLost}</span>
            </div>
        </section>
    )
}