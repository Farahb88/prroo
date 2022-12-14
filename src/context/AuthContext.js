import { createContext, useState } from "react";

export const AuthContext = createContext()

const UserManager = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('the_user') || "{}"))
    const [token, setToken] = useState(localStorage.getItem('the_token') || '')

    const signIn = ({data, token}) => {
        setUser(data)
        setToken(token)
        localStorage.setItem('the_token', token)
        localStorage.setItem('the_user', JSON.stringify(data))
    }
    const signOut = () => {
        setUser({})
        setToken('')
        localStorage.removeItem('the_user')
        localStorage.removeItem('the_token')
    }
    return (
        <AuthContext.Provider value={{
            user: user,
            token: token,
            signIn: signIn,
            signOut: signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default UserManager







