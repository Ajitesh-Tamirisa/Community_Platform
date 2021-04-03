import React from 'react'
import { Route, Redirect} from 'react-router-dom'
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
                    return <div><br></br><br></br>Loading...</div>
                }
                if(currentUser){
                    if(currentUser)
                        return <Component {...props}/>
                    else
                        return <div style={{margin:"25px"}}><strong>Please verify your email to view this page!</strong></div>
                }
                else{
                    return <Redirect to="/Signin" />
                }
            }} 
        >
        </Route>
    )
}

export default PrivateRoute
