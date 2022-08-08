import "../../css/tickets.css"
import Client from "../../index"
import { useContext } from "react";
import {PageContext} from "./tickets"

const Page_Btn = (props) => {
    const {curPage, setCurPage} = useContext(PageContext)
    return (
        <div className="page-btn-wrapper">
            <div className="page-btn-content">
                {
                    curPage === props.text ? (
                        <button 
                        className="page-btn btn-active"
                        onClick={() => { 
                            setCurPage(props.text)
                            Client.emit("page-change", {page: props.text})
                        }}
                        >{props.text}</button>
                    ) : (
                        <button 
                        className="page-btn"
                        onClick={() => { 
                            setCurPage(props.text)
                            Client.emit("page-change", {page: props.text})
                        }}
                        >{props.text}</button>
                    )
                }
            </div>
        </div>
    )
}

export default Page_Btn;
