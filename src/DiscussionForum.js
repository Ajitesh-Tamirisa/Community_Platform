import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Card from './components/Card/Card';
import BranchTabs from './components/Tabs/Tabs';
import FormDialog from './components/QuestionDialog/QuestionDialog'
import {Link} from 'react-router-dom';
import {api } from './api.js'

function DiscussionForum(props) {
  const keys = {
            "general": 100,
            "Civil": 732,
            "CSE": 733,
            "EEE": 734,
            "ECE": 735,
            "Mechanical": 736,
            "IT": 737
          }
  const val = {
            "general": 0,
            "Civil": 1,
            "CSE": 2,
            "EEE": 3,
            "ECE": 4,
            "Mechanical": 5,
            "IT": 6
          }
  const [questions, setQuestions] = useState([]);

async function getResults(){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"branch":keys[props.match.params.branchId]});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  await fetch(api+"discussion-forum/view_all", requestOptions)
  .then(response => response.json())
  .then(res =>{
    console.log(res, res.result, res.status);
    if(res.status==200){
      setQuestions(res.result)
    }
  })
  .catch(error => console.log('error', error));
}

useEffect(() => {
    getResults();
}, [props.match.params.branchId])

  return (
    <div>
      <Navbar/>
      <div className="jumbo">
            <h1 className="jumbo__h1">Discussion Forums</h1>
            <p className="jumbo__p">
            Have questions related to your academics or college life in general? Get them answered by your peers, alumni and faculty of your college!
            </p>
            </div>
      <FormDialog/>
      <BranchTabs value={val[props.match.params.branchId]} />
            {console.log(Object.keys(questions).length)}
      {Object.keys(questions).length ? Object.keys(questions).reverse().map((qn) => (
          <div key={questions[qn].qid} className='content'>
            <span className='card'>
              <Link to={`/DiscussionForums/${props.match.params.branchId}/${questions[qn].qid}`} className="links"><Card author={questions[qn].author} flag={1} timestamp={questions[qn].timestamp} question={questions[qn].question}/></Link>
            </span>
          </div>
        )): <div style={{margin:"10px"}}><br></br>No  question have been posted here yet </div>}
    </div>
  )
}

export default DiscussionForum

