import React from 'react'
import { Route, Redirect, Link} from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext"

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser, pending } = useAuth()
    // console.log(currentUser.email)
    if(currentUser){
        console.log(currentUser.email)
    }
    return (
        <Route 
            {...rest}
            render={props => {
                if(pending){
                    return <div>Loading...</div>
                }
                if(currentUser){
                    if(localStorage.getItem("userType") != 0){                    
                        return <div style={{margin:"15px", fontSize:"20px"}}><strong>You are not authorized to view this page!</strong></div>
                    }
                    else{
                       return <Component {...props}/>
                    }
                }
                else{
                    return <div><strong>If you are an admin, please <Link to="/Admin/Signin">sign in</Link> to view this page.</strong></div>
                }
            }} 
        >
        </Route>
    )
}

export default PrivateRoute
