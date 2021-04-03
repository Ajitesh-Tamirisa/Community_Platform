import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import getTimestamp from "../../getTimestamp";
import { useAuth } from '../../contexts/AuthContext';
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
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setOpen(false);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"author":currentUser.email, "content": oppRef.current.value, "title": titleRef.current.value, "timestamp":getTimestamp(), "link": linkRef.current.value});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log(raw)
    fetch(api+"opportunities/post", requestOptions)
    .then(response => response.json())
    .then(result =>{
        console.log(result);
        if(result.status == 200){
            alert("Your opportunity has been successfully posted!")
            window.location.reload();
        }
    })
    .catch(error => console.log('error', error));
  };

  return (
    <div>
      <Button variant="outlined" color="primary" className={classes.askButton} onClick={handleClickOpen}>
        Post a new Opportunity
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>        
        <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">Post Opportunity</DialogTitle>
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
                label="Opportunity"
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
                variant="outlined"
                inputRef={linkRef}
            />
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
