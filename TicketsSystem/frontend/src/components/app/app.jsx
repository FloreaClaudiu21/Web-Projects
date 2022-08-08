import "../../css/app.css"
import Header from "../head/header"
import {Auth} from "../../firebase"
import Footer from "../footer/footer"
import Tickets from "../tickets/tickets"
import Client from "../.."
import MaintenanceModal from "../modals/components/main"
import React, { useState, useEffect} from "react"
import InfoModal from "../modals/components/info"
import LoginForm from "../modals/components/login"
import { onAuthStateChanged } from "firebase/auth";
import AddTicketModal from "../modals/components/addticket"
import RenewPassFormModal from "../modals/components/renewpassword"


export const timeout = []
export const LoggedContext = React.createContext()
export const AddModalContext = React.createContext()
export const InfoModalContext = React.createContext()
export const LoginModalContext = React.createContext()
export const PassModalContext = React.createContext()
export const InfoMsgModalContext = React.createContext()

const App = () => {
  const [Logged, setLogged] = useState(false)
  const [oobCode, setoobCode] = useState("")
  const [mainModal, setmainModal] = useState(false);
  const [addModal, setAddModal] = useState(false);  
  const [infoModal, setInfoModal] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [infoMsgModal, setInfoMsgModal] = useState("");
  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if(!user) {
        setLogged(false)
      } else {
        setLogged(true)
      }
    });
    // CONNECTION ERRORS
    Client.on("connect", () => {
      setmainModal(false)
    })
    Client.on("connect_error", () => {
      setmainModal(true)
    });
  }, [])
  return (
          <LoggedContext.Provider value={{
              log: Logged,
              setLog: setLogged
          }}>
              <AddModalContext.Provider value={{
                  visible: addModal,
                  setVisible: setAddModal
              }}>
                <LoginModalContext.Provider value={{
                  visibleL: loginModal,
                  setVisibleL: setLoginModal
                }}>
                  <InfoModalContext.Provider value={{
                    visibleI: infoModal,
                    setVisibleI: setInfoModal
                  }}>
                    <InfoMsgModalContext.Provider value={{
                      msg: infoMsgModal,
                      setMsg: setInfoMsgModal
                    }}>
                      <PassModalContext.Provider value={{
                        visibleP: passModal,
                        setVisibleP: setPassModal
                      }}>
                        <div className="root-wrapper">
                              <Header code={oobCode} setCode={(e) => setoobCode(e)}></Header>
                              <Tickets></Tickets>
                              <InfoModal></InfoModal>
                              <LoginForm></LoginForm>
                              <AddTicketModal></AddTicketModal>
                              <MaintenanceModal visible={mainModal}></MaintenanceModal>
                              <RenewPassFormModal code={oobCode} setCode={(e) => setoobCode(e)}></RenewPassFormModal>
                        </div>
                        <Footer></Footer>
                      </PassModalContext.Provider>
                    </InfoMsgModalContext.Provider>
                  </InfoModalContext.Provider>
                </LoginModalContext.Provider>
              </AddModalContext.Provider>
          </LoggedContext.Provider>
  )
             
}

export default App;