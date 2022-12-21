import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
const Signout = () => {
    const auth= useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        auth.signout()
        setTimeout(() => {
            navigate('/Signin')
        },2000)
    },[])
    return (
        <div >

        </div>
    )
}

export default Signout