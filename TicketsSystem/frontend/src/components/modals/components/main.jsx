import "../../../css/modals.css"
import { animated as a, useSpring } from "react-spring"
import main from "../../../resc/main.jpg"

const MaintenanceModal = (props) => {
    const show_styles = useSpring({ 
        opacity: props.visible ? 1 : 0,
        top: props.visible ? 0 : -100
    })
    const hide_styles = useSpring({ 
        opacity: !props.visible ? 0 : 1,
        top: !props.visible ? -100 : 0
    })
    const hide = useSpring({ opacity: !props.visible ? 0 : 1, pointerEvents: "none"})
    return (
        !props.visible ? (
            <a.div className="modal-wrapper" style={hide}>
                <a.div className="modal-content" style={hide_styles}>
                    <img className="modal-main" src={main} alt=""></img>
                </a.div>
            </a.div>
        ) : (
            <div className="modal-wrapper">
                <a.div className="modal-content" style={show_styles}>
                    <div className="modal-wrapper-main">
                        <img className="modal-main" src={main} alt=""></img>
                        <p className="modal-text">Connection error, we are currently under maintenance, please try again later!</p>
                    </div>
                </a.div>
            </div>
        )
    )
}

export default MaintenanceModal;

