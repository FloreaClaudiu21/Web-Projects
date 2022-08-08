import FloatModal from "../modalbase"
import { Auth } from "../../../firebase"
import loading from "../../../resc/loading.jpg"
import { useRef, useContext, useState } from "react"
import { confirmPasswordReset, checkActionCode } from "firebase/auth"
import { timeout, PassModalContext, InfoModalContext, InfoMsgModalContext } from "../../app/app"

export function titleCase(string){
    return (string[0].toUpperCase() + string.slice(1).toLowerCase());
}

const RenewPassFormModal = (props) => {
    const pass_field = useRef("")
    const repass_field = useRef("")
    const [email, setEmail] = useState(null)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const {setMsg} = useContext(InfoMsgModalContext)
    const [loadingLogin, setLoading] = useState(false)
    const {visibleP, setVisibleP} = useContext(PassModalContext)
    const {visibleI, setVisibleI} = useContext(InfoModalContext)
    const show_info = (msgs, seconds) => {
        if (visibleI) {
            timeout.forEach((task) => {
                clearTimeout(task)
                timeout.pop()
            })
        }
        setMsg(msgs)
        setVisibleI(true)
        let t = setTimeout(() => {
            setVisibleI(false)
        }, seconds * 1000)
        timeout.push(t)
    }
    const clear_fields = () => {
        setError(false)
        setLoading(false)
        setErrorMsg(false)
        pass_field.current.value = ""
        repass_field.current.value = ""
    }
    const renew_pass = (ev) => {
        ev.preventDefault()
        setLoading(true)
        if (pass_field.current.value !== repass_field.current.value) {
            setError(true)
            setLoading(false)
            setErrorMsg("❌ Error: Passwords do not match")
            return
        }
        checkActionCode(Auth, props.code).then((v) => {
            setEmail(v.data.email.toString())
            confirmPasswordReset(Auth, props.code, pass_field.current.value).then(() => {
                clear_fields()
                setLoading(false)
                setVisibleP(false)
                show_info("✅ Successfully changed your password for email: " + v.data.email, 4)
            }).catch((err) => {
                if (err.code) {
                    setError(true)
                    setLoading(false)
                    setErrorMsg("❌ Error: " + titleCase(err.code.toString().replace("auth/", "").replace("-", " ")))
                }
            })
        }).catch((err) => {
            if (err.code) {
                setError(true)
                setLoading(false)
                setErrorMsg("❌ Error: " + titleCase(err.code.toString().replace("auth/", "").replace("-", " ")))
            }
        })
    }
    return (
        <FloatModal visible={visibleP} close={() => {
            setVisibleP(false)
            clear_fields()
        }}>
            <div className="form-wrapper">
                <div className="form-section-top">
                    <div className="form-bg">
                        <div className="img-holder">
                            {loadingLogin && <img src={loading} alt=""></img>}
                        </div>
                        <p className="form-title">Renew password Form</p>
                        {error && <div className="form-error-wrapper">
                            <p className="form-error">{errorMsg}</p>
                        </div>
                        }
                    </div>
                </div>
                <div className="form-section-bottom">
                    <form className="form" onSubmit={renew_pass} autoComplete="off">
                        {email !== null && <p className="mail">{email}</p>}
                        <div className="form-wrap-input">
                            <label htmlFor="pass1">Password:</label>
                            <input id="pass1" className="form-input" ref={pass_field} maxLength={45} type="password" placeholder="Enter your new password..." required />
                        </div>
                        <div className="form-wrap-input">
                            <label htmlFor="rep1">Confirm password:</label>
                            <input id="rep1" className="form-input" ref={repass_field} maxLength={45} type="password" placeholder="Confirm your new password..." required />
                        </div>
                        <button className="form-btn" style={{marginTop: "30px"}}>Renew password</button>
                    </form>
                    <div className="form-bottom">
                    </div>
                </div>
            </div>
        </FloatModal>
    )
}

export default RenewPassFormModal;