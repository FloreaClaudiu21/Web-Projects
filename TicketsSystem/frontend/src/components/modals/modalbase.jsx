import "../../css/modals.css"
import { animated as a, useSpring } from "react-spring";

const FloatModal = (props) => {
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
                    <button className="modal-close-btn" onClick={() => {
                        props.close()
                    }}>X CLOSE</button>
                    {props.children}
                </a.div>
            </a.div>
        ) : (
            <div className="modal-wrapper">
                <a.div className="modal-content" style={show_styles}>
                    <button className="modal-close-btn" onClick={() => {
                        props.close()
                    }}>X CLOSE</button>
                    {props.children}
                </a.div>
            </div>
        )
    )
}

export default FloatModal;