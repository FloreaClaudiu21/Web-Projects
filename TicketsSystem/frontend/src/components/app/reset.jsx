import {Auth} from "../../firebase"
import { useEffect } from "react";
import { checkActionCode } from "firebase/auth";
import { useNavigate } from "react-router-dom"

const Reset = () => {
    let error = "", code = "";
    let nav = useNavigate()
    useEffect(() => {
      async function fetch() {
        const queryParams = new URLSearchParams(window.location.search)
        const oobCode = queryParams.get("oobCode")
        const apiKey = queryParams.get("apiKey")
        if (oobCode != null && apiKey != null) {
            try {
              await checkActionCode(Auth, oobCode)
              code = oobCode
              error = null
            } catch(err) {
              code = null
              error = err.code.toString().replace("auth/", "").replace("-", " ")
            }
        }
        const state = {
          state: {
            cod: code,
            err: error
          }
        }
        nav("/", state)
      }
      fetch()
    }, [])
    return <div>Redirecting to the home page...</div>
 }

 export default Reset;