import "../../css/footer.css"
import HeaderBGF from "../../resc/BGRadialF.png"
import BlobRight from "../../resc/BlobRight.png"
import BlobLeft from "../../resc/BlobLeft.png"

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <img className="footer-bg" src={HeaderBGF} alt="Not found"></img>
            <div className="footer-content"></div>
            <div className="footer-text"><p>This application has been developed using HTML, CSS/SASS, ReactJS, NodeJS, MongoDB, Firebase and SocketIO with ❤️ by Florea Claudiu 🧑🏻‍💻</p></div>
            <div className="fixed-wrapper1">
                <img className="blob-right" src={BlobRight} alt="Not found"></img>
                <img className="blob-left" src={BlobLeft} alt="Not found"></img>
            </div>
        </footer> 
    )
}

export default Footer;