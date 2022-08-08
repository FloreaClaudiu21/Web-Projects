import "../../css/tickets.css"
import Ticket from "./ticket"
import Client from "../../index"
import Page_Btn from "./page_btn"
import { Auth } from "../../firebase"
import noresult from "../../resc/no-result.gif"
import BlobTRight from "../../resc/BlobTRight.png"
import React, { useState, useEffect, useContext } from "react"
import {  timeout, AddModalContext, LoginModalContext, InfoModalContext, InfoMsgModalContext } from "../app/app"
export const PageContext = React.createContext()

const Tickets = () => {
    const [btns, setButtons] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [tickets, setTickets] = useState([]);
    const {setVisible} = useContext(AddModalContext)
    const {setVisibleL} = useContext(LoginModalContext)
    const {setMsg} = useContext(InfoMsgModalContext)
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
    const create_btns = (tickets_size) => {
        let mapb = []
        let pages = 0;
        for (let i = tickets_size; i > 0; i=i-8) {
            pages += 1
            // eslint-disable-next-line
            mapb.push(<Page_Btn key={i} text={pages}></Page_Btn>)
        }
        setButtons(mapb)
    }
    useEffect(() => {
        Client.on("tickets", ({tickets_list, startp}) => {
            setTickets(tickets_list)
            if ((startp / 8) !== curPage) {
                setCurPage(startp / 8)
            }
        })
        Client.on("tickets-size", ({tickets_size}) => {
            create_btns(tickets_size)
        })
        Client.on("ticket-created", ({ticket, user}) => {
            show_info("✅ " + ticket + " have been created successfully by user: " + user, 4)
        })
        Client.on("ticket-deleted", ({ticket, user}) => {
            show_info("❌ " + ticket + " have been deleted successfully by user: " + user, 4)
        })
        Client.on("error", (err) => {
            show_info("❌ Error: " + err.message, 4)
        })
    })
    const start = curPage > 1 ? (curPage * 8) - 8 : 1
    const end = (curPage * 8)
    return (
        <PageContext.Provider value={{curPage, setCurPage}}>
            <div className="tickets-wrapper">
                <div className="tickets-top">
                    <span className="tickets-title">Tickets list</span>
                </div>
                <div className="tickets-bottom">
                    <div className="tickets-panel">
                        <div className="tickets-panel-top">
                            {
                                tickets.length > 0 ? (
                                    <p className="ticket-info">Showing tickets {start} to {end}..</p>
                                ) : (
                                    <p className="ticket-info"></p>
                                )
                            }
                            <div className="ticket-add-wrapper">
                                <button className="ticket-add-btn" onClick={() => 
                                    {
                                       Auth.currentUser !== null ? setVisible(true) : setVisibleL(true)
                                    }
                                }>+ Add new ticket</button>
                            </div>
                        </div>
                        <img className="blob-tright" src={BlobTRight} alt="Not found"></img>
                        {
                            tickets.length === 0 ?
                            (
                                <div className="tickets-content" style={{display: "flex", flexDirection: "row"}}>
                                    <img className="tickets-noresults" src={noresult} alt=""></img> 
                                </div>
                            ) : (
                                <div className="tickets-content-padding">
                                    <div className="tickets-content"> {
                                        tickets.map((e) => {
                                            return <Ticket key={e.name} name={e.name} desc={e.desc} user={e.user}></Ticket>;
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        }
                        <div className="tickets-buttons">
                            {btns}
                        </div>
                    </div>
                </div>
            </div>
        </PageContext.Provider>
    )
}

export default Tickets;