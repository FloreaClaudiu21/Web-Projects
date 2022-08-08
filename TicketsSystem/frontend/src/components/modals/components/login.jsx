import FloatModal from "../modalbase"
import googleicon from "../../../resc/google.png"
import { useRef, useContext, useState } from "react"
import loading from "../../../resc/loading.jpg"
import { GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { Auth, createUser, signInWithGoogle } from "../../../firebase"
import { timeout, LoginModalContext, InfoModalContext, InfoMsgModalContext } from "../../app/app"

export function titleCase(string){
    return (string[0].toUpperCase() + string.slice(1).toLowerCase());
}

const LoginFormModal = () => {
    const pass_field = useRef("")
    const email_field = useRef("")
    const repass_field = useRef("")
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [loadingLogin, setLoading] = useState(false)
    const {setMsg} = useContext(InfoMsgModalContext)
    const {visibleL, setVisibleL} = useContext(LoginModalContext)
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
    const login_google = () => {
        setLoading(true)
        let auth_google = new GoogleAuthProvider()
        signInWithGoogle(Auth, auth_google).then(()=>{
            clear_fields()
            setVisibleL(false)
            setLoading(false)
            show_info("✅ Successfully login using your google email: " + Auth.currentUser.email, 4)
        }).catch((err) => {
            if (err.code) {
                setError(true)
                setLoading(false)
                setErrorMsg("❌ Error: " + titleCase(err.code.toString().replace("auth/", "").replace("-", " ")))
            }
        })
    }
    const forgot_pass = (ev) => {
        ev.preventDefault()
        setLoading(true)
        sendPasswordResetEmail(Auth, email_field.current.value).then(() => {
            let email = email_field.current.value + ""
            clear_fields()
            setVisibleL(false)
            setLoading(false)
            show_info("✅ Successfully send a link for password reset to your email: " + email, 4)
        }).catch((err) => {
            if (err.code) {
                setError(true)
                setLoading(false)
                setErrorMsg("❌ Error: " + titleCase(err.code.toString().replace("auth/", "").replace("-", " ")))
            }
        })
    }
    const login_pass_email = (ev) => {
        ev.preventDefault()
        setLoading(true)
        if (pass_field.current.value !== repass_field.current.value) {
            setError(true)
            setLoading(false)
            setErrorMsg("❌ Error: Passwords do not match")
            return
        }
        createUser(Auth, email_field.current.value, pass_field.current.value).then(() => {
            clear_fields()
            setLoading(false)
            setVisibleL(false)
            show_info("✅ Successfully login using email: " + Auth.currentUser.email, 4)
        }).catch((err) => {
            if (err.code) {
                if (err.code === "auth/email-already-in-use") {
                    signInWithEmailAndPassword(Auth, email_field.current.value, pass_field.current.value).then(() => {
                        clear_fields()
                        setLoading(false)
                        setVisibleL(false)
                        show_info("✅ Successfully login using email: " + Auth.currentUser.email, 4)
                    }).catch((er) => {
                        if (er.code) {
                            setError(true)
                            setLoading(false)
                            setErrorMsg("❌ Error: " + titleCase(er.code.toString().replace("auth/", "").replace("-", " ")))
                        }
                    })
                    return;
                }
                setError(true)
                setLoading(false)
                setErrorMsg("❌ Error: " + titleCase(err.code.toString().replace("auth/", "").replace("-", " ")))
            }
        })
    }
    const clear_fields = () => {
        setError(false)
        setLoading(false)
        setErrorMsg(false)
        pass_field.current.value = ""
        email_field.current.value = ""
        repass_field.current.value = ""
    }
    return (
        <FloatModal visible={visibleL} close={() => {
            setVisibleL(false)
            clear_fields()
        }}>
            <div className="form-wrapper">
                <div className="form-section-top">
                    <div className="form-bg">
                        <div className="img-holder">
                            {loadingLogin && <img src={loading} alt=""></img>}
                        </div>
                        <p className="form-title">Login Form</p>
                        {error && <div className="form-error-wrapper">
                            <p className="form-error">{errorMsg}</p>
                        </div>
                        }
                    </div>
                </div>
                <div className="form-section-bottom">
                    <form className="form" onSubmit={login_pass_email} autoComplete="off">
                            <div className="form-wrap-input">
                                <label htmlFor="email">Email:</label>
                                <input id="email" className="form-input" ref={email_field} maxLength={100} type="email" placeholder="Enter your email address..." required />
                            </div>
                            <div className="form-wrap-input">
                                <label htmlFor="pass">Password:</label>
                                <input id="pass" className="form-input" ref={pass_field} maxLength={45} type="password" placeholder="Enter your password..." required />
                            </div>
                            <div className="form-wrap-input">
                                <label htmlFor="rep">Confirm password:</label>
                                <input id="rep" className="form-input" ref={repass_field} maxLength={45} type="password" placeholder="Confirm your password..." required />
                            </div>
                            <button className="form-btn">Login</button>
                            <button className="forgot-form-btn" onClick={forgot_pass}>Forgot your password?</button>
                    </form>
                    <div className="form-bottom">
                        <button onClick={login_google}>
                            <img src={googleicon} alt=""></img>
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </FloatModal>
    )
}

export default LoginFormModal;