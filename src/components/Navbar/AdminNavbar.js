import React, { useState } from 'react';
import {MenuItems} from './AdminNavbarItems';
import {Link, useHistory} from 'react-router-dom';
import {Button} from "@material-ui/core";
import { useAuth } from '../../contexts/AuthContext';
import '../../App.css'
import './Navbar.css';

function Navbar(){
    const [clicked, setClicked] = useState(false);
    const history = useHistory()
    const { signout } = useAuth()
    
    async function handleSignout() {
        try{
            await signout();
            localStorage.removeItem("userType")
            history.push('/Signin');
        }
        catch{
            alert("Error signing you out!");
        }
    }

    return <nav className='Navbar' style={{marginBottom:"20px"}}>
            <h1 className='Navbar__header'><i className='fa fa-graduation-cap Navbar__logo'></i>Admin dashboard</h1>
            <div className='Navbar__icon' onClick={()=> setClicked(!clicked)}>
                <i className={clicked?'fa fa-times':'fa fa-bars'}></i>
            </div>
            <ul className={clicked?'Navbar__menu active':'Navbar__menu'}>
                {MenuItems.map((item, index)=>{
                    if(!item.button)
                    {
                        return (
                            <li key={index}>                                
                                <Link className="links" to={item.url}>
                                        <a className={item.cName}>
                                            {item.name}
                                        </a>                                        
                                </Link>
                            </li>
                    )
                    }
                    else{
                        return(
                            <li key={index}>
                                <Button onClick={()=>{handleSignout()}} className={item.cName} variant="contained" size="small" color="secondary">Signout</Button>
                            </li>
                        )
                    }
                })}
            </ul>
            
        </nav>
}

export default Navbar;