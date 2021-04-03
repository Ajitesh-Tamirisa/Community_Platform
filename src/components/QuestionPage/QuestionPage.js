import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../Navbar/Navbar';
import Card from '../Card/Card'
import TextField from '@material-ui/core/TextField';
import RepliesCard from '../Card/RepliesCard'
import { Button } from "@material-ui/core"
import { useAuth } from '../../contexts/AuthContext';
import getTimestamp from "../../getTimestamp";
import { api } from "../../api";

import '../../App.css'

function QuestionPage(props) {
    
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

        var raw = JSON.stringify({"branch":keys[props.match.params.branchId],"qid":""+props.match.params.questionId});
        console.log(raw)
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch(api+"discussion-forum/ques_data", requestOptions)
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

    const handleSubmit = (e)=>{
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"author":currentUser.email, "branch": keys[props.match.params.branchId], "qid": props.match.params.questionId, "timestamp":getTimestamp(), "reply":replyRef.current.value});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        console.log(raw)
        fetch(api+"discussion-forum/post_reply", requestOptions)
        .then(response => response.json())
        .then(result =>{
            console.log(result);
            if(result.status == 200){
                alert("Your reply has been successfully posted!")
                window.location.reload()
            }
        })
        .catch(error => console.log('error', error));
        // console.log(questionRef.current.value, branch)
    }
    
    return (
        <div>
            {/* {console.log(result)} */}
            <Navbar/>
            {/* {props.match.params.questionId} */}
            {/* {result.map((qn) => (
                <div key={qn._id.$oid} className='content'>
                    <span className='card'>
                        <Card author={qn.author} timestamp={qn.timestamp} question={qn.question}/>
                    </span>
                </div>
            ))} */}
            
            <h2>Discussion Forums - {props.match.params.branchId}</h2>
            
            {result[0] ?
            <div className='content'>
                    <span className='oppCard'>
                        <Card author={result[0].author} timestamp={result[0].timestamp} question={result[0].question}/>
                    </span>
                    <TextField id="outlined-basic" label="Answer this question" variant="outlined" multiline={true} rows={5} inputRef={replyRef} />
                    <Button variant="outlined" color="secondary" onClick={handleSubmit}>Post</Button>
                    <div  className='content' style={{width:"90%"}}>
                        {console.log(result)}
                    {result[0].replies ? Object.keys(result[0].replies).map(function(key, index) {
                        return (
                            <span>
                                <RepliesCard author={result[0].replies[key].r_author} timestamp={result[0].replies[key].r_timestamp} reply={result[0].replies[key].reply}/>
                            </span>
                        )
                    }): <div>No replies yet</div>}
                    </div>                
            </div> : <div></div>}
        </div>
    )
}

export default QuestionPage
