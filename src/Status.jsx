export default function Status(props){
    return(
        <div className="status" 
            style={{
                backgroundColor: props.bg
            }}
        >
            <span className="status-line-1">{props.status}</span><br />
            <span className="status-line-2">{props.message}</span>
        </div>
    )
}