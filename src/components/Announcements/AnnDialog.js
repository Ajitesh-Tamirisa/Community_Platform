import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import getTimestamp from "../../getTimestamp";
import CircularProgressWithLabel from '@material-ui/core/CircularProgress';
import { useAuth } from '../../contexts/AuthContext';
import app from "../../firebase";
import firebase from "firebase/app"
import 'firebase/storage';
import { api } from "../../api";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [branch, setBranch] = React.useState('');
  const { currentUser } = useAuth()

  
  const oppRef = useRef();
  const linkRef = useRef();
  const titleRef = useRef();

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    askButton: {
        marginTop: theme.spacing(1)
    }
  }));
  const classes = useStyles();

  const handleChange = (event) => {
    setBranch(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // console.log(document.getElementById("picture").files[0])
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    document.getElementById("progress").style.display="flex"
    let title = titleRef.current.value;
    let opp = oppRef.current.value;
    let link = linkRef.current.value;
    if(document.getElementById("picture").files[0]){
      let storageRef = firebase.storage().ref('Announcements/'+document.getElementById("picture").files[0].name)
      let uploadTask = storageRef.put(document.getElementById("picture").files[0]);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        alert("Error uploading image! Please try again later.")
      }, 
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          // console.log(oppRef.current.value)
          sendData(downloadURL, link, title, opp)
          
        });
      }
    );
  }
  else{
    sendData("-", linkRef.current.value, titleRef.current.value, oppRef.current.value);
  }

    setOpen(false);
    //
  };

  function sendData(imageUrl="-", link, title, opp){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"author":currentUser.email, "content": opp, "title": title, "link": link, "timestamp": getTimestamp(), "imageUrl": imageUrl});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log(raw)
    fetch(api+"announcements/post", requestOptions)
    .then(response => response.json())
    .then(result =>{
      
    // document.getElementById("progress").style.display="none"
        console.log(result);
        if(result.status == 200){
            alert("Your announcement has been successfully posted!")
            window.location.reload();
        }
        else{
          alert("An error occured. Please try again later");
          window.location.reload();
        }
    })
    .catch(error => console.log('error', error));
  }

  return (
    <div>
      <Button variant="outlined" color="primary" className={classes.askButton} onClick={handleClickOpen}>
        Post announcement
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>    
        <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">Post Announcement</DialogTitle>
            <DialogContent>
            <TextField
                margin="dense"
                id="link"
                label="Title"
                required
                fullWidth
                variant="outlined"
                inputRef={titleRef}
            />
            <TextField
                margin="dense"
                id="Content"
                label="Content"
                required
                fullWidth
                variant="outlined"
                inputRef={oppRef}
                multiline={true}
                rows={5}
            />
            <TextField
                margin="dense"
                id="link"
                label="Related Links"
                fullWidth
                required
                variant="outlined"
                inputRef={linkRef}
            />
            <div style={{margin:"10px 0"}}>
            <label for="picture">Image: </label>
            <input
            accept="image/*"
            className={classes.input}
            id="picture"
            type="file"
            />
            </div>
            <div id="progress" style={{margin:"15px", display:"none", justifyContent:"center"}}><CircularProgressWithLabel style={{textAlign:"center"}} value={80} /></div>  

            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="secondary">
                Cancel
            </Button>
            <Button type="submit" color="secondary">
                Post
            </Button>
            </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

