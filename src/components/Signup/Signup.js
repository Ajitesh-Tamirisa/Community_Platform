import React, { useRef, useState } from 'react'
import {Grid, Paper, TextField, Button, Typography} from "@material-ui/core"
import { Link, useHistory } from 'react-router-dom';
import Alert from "@material-ui/lab/Alert"
import AdminNavbar from "../Navbar/AdminNavbar"
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import "./Signup.css"
import Signin from '../Signin/Signin';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import signupPic from "./signup.svg"
import { api } from "../../api";

function Signup({userType}) {
    const nameRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()
    const confpassRef = useRef()
    const { signout, signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)    
    const history = useHistory()
    
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          justifyContent: 'center'
        },
      }));
    if(!userType){
        userType=2
    }
    console.log(userType)
    async function handleSubmit(e){
        e.preventDefault();        
        setError('')
        console.log(userType)
        if(passRef.current.value !== confpassRef.current.value){
            // console.log("err1")
            return setError('Passwords do not match!')
        }
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passRef.current.value);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({"name":nameRef.current.value,"email":emailRef.current.value,"pwd":passRef.current.value,"userType": userType});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            console.log(raw)
            await fetch(api+"register", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status == 200){
                    setError('')
                    setSuccess("Account created Successfully!")
                    signout()
                    if(userType !== 2){                        
                        alert("Account created successfully!")
                        history.push("/Signin");
                    }
                    else{
                        alert("Account created successfully!")
                        window.location.reload();
                    }
                }
                else if(result.status == 202){
                    setError('User already exists');
                }
                else{
                    setError('Failed to create account')
                }
            })
            .catch(error => {
                console.log(error);
                setError('Failed to create account')
            });
        }
        catch{
            setError('Failed to create account')
        }
        setLoading(false)
    }

    const paperStyle = {padding:20, height: '74vh', width: '300px', margin: 'auto'};
    const buttonStyle = {margin:'20px 10px'};
    const textfieldStyle = {margin: '15px 0'};
    const preventDefault = (event) => event.preventDefault();
    const classes = useStyles();
    return (
        <div>
            
        {userType==1 ?<h2 style={{fontSize:"2rem", margin:"5px"}}><i className='fa fa-graduation-cap Navbar__logo'></i> Community Platform</h2>: <AdminNavbar/>}
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", margin:"4+px"}}>
        <div className="box" style={{display:"flex", alignItems:"center", justifyContent:"space-around", width:"80%", padding:"18px", boxShadow:" rgba(0, 0, 0, 0.15) 0px 5px 15px 0px", borderRadius: "12px" }}>
            <div className="signupDiv">
            <Grid>
            
                <Paper className="paper" elevation={2} square={false} border-radius={100} style={paperStyle}>
                    {/* <h2><i className='fa fa-graduation-cap'></i> Community Platform</h2> */}
                    {userType==1 ?<h1>Student Sign Up</h1>: <h1><i className="fas fa-chalkboard-teacher"></i>Add Faculty</h1>}
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField style={textfieldStyle} id="name" label="Full Name" placeholder="Full Name" variant="outlined" inputRef={nameRef} required/>
                        <TextField style={textfieldStyle} id="emailId" label="E-mail" placeholder="Enter e-mail" variant="outlined" inputRef={emailRef} required type="email"/>
                        <TextField style={textfieldStyle} id="password" label="Password" placeholder="Enter password" variant="outlined" type="Password" inputRef={passRef} required/>
                        <TextField style={textfieldStyle} id="confPassword" label="Confirm Password" placeholder="Confirm password" variant="outlined" type="Password" inputRef={confpassRef} required/>
                        <div className={classes.root}>
                            {loading && <CircularProgress/>}
                        </div>
                        <Button disabled={loading} style={buttonStyle} variant="contained" type="submit" color="secondary">Sign Up</Button>
                    </form>
                    {userType==1 ? <Typography>
                        Already have an account?<span> </span>
                        <Link to="/Signin">Sign In</Link>
                    </Typography>: <br></br>}
                </Paper>
            </Grid>
            </div>
            <div className="signupPicDiv">
                <img className="signupPic" src={signupPic}/>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Signup
