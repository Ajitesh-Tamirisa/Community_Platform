import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../Navbar/Navbar';
import OppsCard from '../Card/OppsCard'
import TextField from '@material-ui/core/TextField';
import RepliesCard from '../Card/RepliesCard'
import { Button } from "@material-ui/core"
import { useAuth } from '../../contexts/AuthContext';
import { api } from "../../api";

import '../../App.css'

function OppsPage(props) {
    
    const [result, setResult] = useState([]);
    const { currentUser } = useAuth()
    const keys = {
        "general": 100,
        "Civil": 732,
        "CSE": 733,
        "EEE": 734,
        "ECE": 735,
        "Mechanical": 736,
        "IT": 737
      }
    const replyRef=useRef();
    
    async function getResults(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"oppId":props.match.params.oppId});
        console.log(raw)
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch(api+"opportunities/opp_data", requestOptions)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            setResult(res.result);
        })
        .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getResults();
    }, [])
    
    return (
        <div>
            <Navbar/>
            
            <h2>Opportunities - View post</h2>
            
            {result ?
            <div className='content'  style={{width:"77%"}}>
                    <span className='oppCard' style={{marginTop:"35px"}}>
                        <OppsCard author={result.author} timestamp={result.timestamp} title={result.title} content={result.content} link={result.link} flag={false}/>
                    </span>               
            </div> : <div></div>}
        </div>
    )
}

export default OppsPage
