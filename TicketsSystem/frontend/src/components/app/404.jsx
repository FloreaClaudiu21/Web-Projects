import i404 from "../../resc/i404.png"
import "../../css/app.css"
import MarketPic from "../../resc/MarketPic.png"
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div className="page-wrapper-404">
            <div className="page-logo">
                <img src={MarketPic} alt="" />
                <p>Ticketing Management System</p>
            </div>
            <div className="page-bottom">
                <img src={i404} alt=""></img>
                <Link className="page-back" to="/"><p>Main Page</p></Link>
            </div>
        </div>
    )
}

export default Page404;