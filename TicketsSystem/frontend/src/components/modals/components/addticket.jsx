import FloatModal from "../modalbase"
import Client from "../../../index"
import { titleCase } from "./renewpassword"
import loading from "../../../resc/loading.jpg"
import { useEffect, useRef, useContext, useState } from "react"
import { AddModalContext } from "../../app/app"
import { Auth } from "../../../firebase"

const AddTicketModal = () => {
    const desc_field = useRef("")
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [loadingLogin, setLoading] = useState(false)
    const {visible, setVisible} = useContext(AddModalContext)
    const clear_fields = () => {
        setError(false)
        setLoading(false)
        setErrorMsg(false)
        desc_field.current.value = ""
    }
    useEffect(() => {
        Client.on("ticket-exists", ({msg}) => {
            setError(true)
            setLoading(false)
            setErrorMsg("❌ Error: " + titleCase(msg))
        })
        Client.on("ticket-close-modal", () => {
            setVisible(false)
            clear_fields()
        })
    })
    const form_submit_ticket = (e) => {
        e.preventDefault();
        setLoading(true)
        const o_el = document.getElementById("select-field");
        Client.emit("ticket-submit", {ticket: o_el.options[o_el.selectedIndex].text, desc: desc_field.current.value, user: Auth.currentUser.email})
    }
    const tables = []
    for (let i = 0; i <= 40; i++) {
        tables.push(<option key={i} value={i}> Ticket #{i} </option>)
    }
    return (
        <FloatModal visible={visible} close={() => setVisible(false)}>
            <div className="form-wrapper">
                <div className="form-section-top">
                    <div className="form-bg">
                        <div className="img-holder">
                            {loadingLogin && <img src={loading} alt=""></img>}
                        </div>
                        <p className="form-title">Add new ticket Form</p>
                        {error && 
                            <div className="form-error-wrapper">
                                <p className="form-error">{errorMsg}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="form-section-bottom">
                    <form className="form" autoComplete="false" onSubmit={form_submit_ticket}>
                        <div className="form-wrap-input">
                            <label htmlFor="select-field">Select ticket number:</label>
                            <select id="select-field" className="form-input" style={{fontSize:"13px", padding: "5px"}} required>
                                {tables}
                            </select>
                        </div>
                        <div className="form-wrap-input" style={{height:"180px"}}>
                            <textarea ref={desc_field} className="form-input" id="desc-field" type="text" style={{height:"100%", resize:"none", fontSize:"16px", padding:"5px"}} maxLength={300} min={10} rows={10} placeholder="Description of the ticket..." required></textarea>
                        </div>
                        <button className="form-btn">Add Ticket</button>
                    </form>
                    <div className="form-bottom"></div>
                </div>
            </div>
        </FloatModal>
    )
}

export default AddTicketModal;