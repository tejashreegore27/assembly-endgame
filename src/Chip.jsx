export default function Chip(props){
    const style ={
        backgroundColor: props.bg,
        color: props.color   
    }
    return(
        
        <div style={style} className="chip">
            {props.name}
        </div>
    )
}