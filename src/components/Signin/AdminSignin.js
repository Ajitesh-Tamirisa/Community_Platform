import React, { useRef, useState } from 'react'
import {Grid, Paper, TextField, Button, Typography} from "@material-ui/core"
import { Link, useHistory, Redirect } from 'react-router-dom';
import Alert from "@material-ui/lab/Alert"
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { api } from "../../api";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import "./Signup.css"

function Signin() {
    const emailRef = useRef()
    const passRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          justifyContent: 'center'
        },
      }));

    // fetch("")
    //   .then(res => res.json())
    //   .then(result => console.log(result))

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passRef.current.value);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({"email":emailRef.current.value,"pwd":passRef.current.value});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            await fetch(api+"login", requestOptions)
            .then(response => response.json())
            .then(result => {

                if(result.status == 200){
                    if(result.userType == 0){
                        localStorage.setItem("userType", result.userType);
                        history.push("/Admin/Users");
                    }
                    else{
                        setError('You are not allowed to sign in here!');
                    }
                }
                else{
                    setError('Failed to sign in!');
                }
            })
            .catch(error => console.log('error', error));
            // history.push("/DiscussionForums/general")
            // await currentUser.sendEmailVerification()
        }
        catch{
            setError('Failed to sign in!')
        }
        setLoading(false)
    }

    // async function handleSubmit(e){

    //     e.preventDefault();        
    //     await login(emailRef.current.value, passRef.current.value);
    //     localStorage.setItem("userType", 0)
    //     history.push("/Admin/AddFaculty")

    // }

    const paperStyle = {padding:20, height: '70vh', width: '300px', margin: '63px auto'};
    const buttonStyle = {margin:'28px 10px'};
    const textfieldStyle = {margin: '30px 0'};
    const preventDefault = (event) => event.preventDefault();
    // if(currentUser){
    //     return <Redirect to="/DiscussionForums"></Redirect>
    // }
    
    const classes = useStyles();
    return (
        <Grid>
            <Paper className="paper" elevation={12} square={false} border-radius={100} style={paperStyle}>
                <h2><i className='fa fa-graduation-cap'></i> Community Platform</h2>
                <h1>Admin Sign In</h1>
                {/* {currentUser && currentUser.email} */}
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField style={textfieldStyle} id="emailId" label="E-mail" placeholder="Enter e-mail" variant="outlined" inputRef={emailRef} required type="email"/>
                    <TextField style={textfieldStyle} id="password" label="Password" placeholder="Enter password" variant="outlined" type="Password" inputRef={passRef} required/>
                    <div className={classes.root}>
                        {loading && <CircularProgress/>}
                    </div>
                    <Button disabled={loading} style={buttonStyle} variant="contained" type="submit" color="secondary">Sign In</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signin
