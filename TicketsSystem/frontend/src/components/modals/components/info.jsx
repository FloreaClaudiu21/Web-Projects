import { useContext } from "react";
import { InfoModalContext, InfoMsgModalContext } from "../../app/app";
import { useSpring, animated as a } from "react-spring";

const InfoModal = () => {
    const {visibleI} = useContext(InfoModalContext)
    const {msg} = useContext(InfoMsgModalContext)
    const show_style = useSpring({
        bottom: visibleI ? "-10px" : "-100px"
    })
    const hide_style = useSpring({
        bottom: !visibleI ? "-100px" : "-10px"
    })
    return (
        visibleI ? (
            <a.div className="info-wrapper" style={show_style}>
                <div className="info-content">
                    <p className="info-msg">{msg}</p>
                </div>
            </a.div>
        ) : (
            <a.div className="info-wrapper" style={hide_style}>
                <div className="info-content">
                    <p className="info-msg">{msg}</p>
                </div>
            </a.div>
        )
    )
}

export default InfoModal;