import {Link} from "react-router-dom"
const bottomwarning=({label,buttonText,to})=>{
    return(
        <div className="flex justify-center">
            {label}
            <Link className="underline px-2" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}

export default bottomwarning;