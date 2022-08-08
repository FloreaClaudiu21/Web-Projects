import "../../css/tickets.css"
import Client from "../../index"
import { Auth } from "../../firebase";
import Ticket_img from "../../resc/ticket.jpg"
import { LoginModalContext } from "../app/app";
import { useState, useEffect, useContext } from "react";
import { useSpring, animated as a } from "react-spring";

const Ticket = (props) => {
    const [deleteAnim, setDeleteAnim] = useState(false)
    const {setVisibleL} = useContext(LoginModalContext)
    const contentProps = useSpring({
        opacity: deleteAnim ? 0 : 1,
        marginTop: deleteAnim ? -280 : 0,
        bordercolor: deleteAnim ? "red" : "white"
    });
    const trigger_delete_anim = () => {
        setDeleteAnim(true)
    }
    useEffect(() => {
        Client.on("ticket-delete-anim", ({ticket}) => {
            if (ticket && props.name === ticket) {
                trigger_delete_anim()
            }
        })
    })
    return (
        <a.div id={props.name} className="ticket-wrapper" style={contentProps}>
            <div className="ticket-content">
                <div className="ticket-top">
                    <img src={Ticket_img} alt=""></img>
                </div>
                <div className="ticket-bottom">
                    <p className="ticket-table">{props.name}</p>
                    <p className="ticket-desc">{props.desc}</p>
                    <p className="ticket-createdby">{props.user}</p>
                    <button className="ticket-complete" onClick={() => {
                        Auth.currentUser !== null ? Client.volatile.emit("ticket-delete", {ticket: props.name, user: Auth.currentUser.email}) : setVisibleL(true)
                    }}>DELETE</button>
                </div>
            </div>
        </a.div>
    )
}

export default Ticket;