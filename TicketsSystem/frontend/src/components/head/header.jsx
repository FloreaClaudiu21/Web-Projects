import "../../css/fixed.css"
import "../../css/header.css"
import {Auth} from "../../firebase"
import UserPic from "../../resc/user.png"
import HeaderBG from "../../resc/BGRadial.png"
import MarketPic from "../../resc/MarketPic.png"
import BlobLeft from "../../resc/BlobLeft.png"
import BlobRight from "../../resc/BlobRight.png"
import BlobTLeft from "../../resc/BlobTLeft.png"
import BlobTRight from "../../resc/BlobTRight.png"
import {titleCase} from "../modals/components/login"
import ousers from "../../resc/onlineusers.webp"
import React, { useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOut, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import {timeout, LoggedContext, LoginModalContext, InfoMsgModalContext, InfoModalContext, PassModalContext} from "../app/app"
const Header = (props) => {
    const nav = useNavigate()
    const location = useLocation()
    const {log, setLog} = useContext(LoggedContext)
    const {setMsg} = useContext(InfoMsgModalContext)
    const {setVisibleL} = useContext(LoginModalContext)
    const {setVisibleP} = useContext(PassModalContext)
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
    const scroll_tickets_section = () => {
        const el = document.getElementsByClassName("tickets-panel")[0]
        el.scrollIntoView({behavior: "smooth"})
    }
    useEffect(() => {
        if (location.state != null) {
            // eslint-disable-next-line
            let cod = location.state.cod;
            // eslint-disable-next-line
            let error = location.state.err;
            if (cod == null) {
                show_info("❌ Error: " + titleCase(error), 4)
            } else {
                props.setCode(cod)
                setVisibleP(true)
            }
            nav("/")
        }
    })
    return (
        <header className="header">
            <div className="fixed-wrapper">
                <img className="blob-left" src={BlobLeft} alt="Not found"></img>
                <img className="blob-tleft" src={BlobTLeft} alt="Not found"></img>
                <img className="blob-right" src={BlobRight} alt="Not found"></img>
                <img className="blob-tright" src={BlobTRight} alt="Not found"></img>
            </div>
            <img className="header-bg" src={HeaderBG} alt="Not found"></img>
            <div className="header-wrapper">
                <div className="header-auth">
                    { 
                      log ? (
                        <div className="header-auth-content">
                            {Auth.currentUser.photoURL != null ? <img className="header-auth-picture" src={Auth.currentUser.photoURL} alt="" /> : <img className="header-auth-picture" src={UserPic} alt="" />}
                            <div className="header-auth-name">
                                <p>{Auth.currentUser.email}</p>
                                <span>{Auth.currentUser.email}</span>
                            </div>
                            <button className="header-auth-logout" onClick={
                                () => {
                                    Auth.signOut().then(() => {
                                        setLog(false)
                                        show_info("✅ Successfully logged out! :(", 4)
                                    })
                                }
                            }>
                                <FontAwesomeIcon icon={faSignOut} />Logout
                            </button>
                        </div>
                      ):(
                        <div className="header-auth-content header-short">
                            <button className="header-auth-login" onClick={() => setVisibleL(true)}>
                                <FontAwesomeIcon icon={faSignInAlt} />Login
                            </button>
                        </div>
                      )                    
                    }
                </div>
                <div className="header-holder">
                    <div className="header-top"><img className="header-pic" src={MarketPic} alt="Not found"></img></div>
                    <div className="header-middle">
                        <div className="header-middle-wrapper" style={{width: "100%", height: "100%", display:"flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "30px"}}>
                            <p className="header-title">Ticketing Management System</p>
                            <button className="header-discover-btn" onClick={scroll_tickets_section}>Discover the tickets</button>
                        </div>
                    </div>
                    <div className="header-bottom">
                        <p className="header-scroll">Scroll down or press the button</p>
                        <span className="header-icon">⮟</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;