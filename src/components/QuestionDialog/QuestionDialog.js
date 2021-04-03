import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import getTimestamp from "../../getTimestamp";
import FormControl from '@material-ui/core/FormControl';
import { useAuth } from '../../contexts/AuthContext';
import { api } from "../../api";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [branch, setBranch] = React.useState('');
  const { currentUser } = useAuth()

  
  const questionRef = useRef();

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

    var raw = JSON.stringify({"author":currentUser.email, "branch": branch, "question": questionRef.current.value, "timestamp":getTimestamp()});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log(raw)
    fetch(api+"discussion-forum/ask", requestOptions)
    .then(response => response.json())
    .then(result =>{
        console.log(result);
        if(result.status == 200){
            alert("Your question has been successfully posted!")
            window.location.reload()
        }
    })
    .catch(error => console.log('error', error));
    console.log(questionRef.current.value, branch)
  };

  return (
    <div>
      <Button variant="outlined" color="primary" className={classes.askButton} onClick={handleClickOpen}>
        Ask a question
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>        
        <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">Ask a Question</DialogTitle>
            <DialogContent>
                <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">Branch</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={branch}
                    onChange={handleChange}
                    className={classes.selectEmpty}
                    fullWidth
                    >
                    <MenuItem value={100}>General</MenuItem>
                    <MenuItem value={732}>Civil</MenuItem>
                    <MenuItem value={733}>CSE</MenuItem>
                    <MenuItem value={734}>EEE</MenuItem>
                    <MenuItem value={735}>ECE</MenuItem>            
                    <MenuItem value={736}>Mechanical</MenuItem>
                    <MenuItem value={737}>IT</MenuItem>
                    </Select>
                </FormControl><br></br><br></br>
            <TextField
                margin="dense"
                id="question"
                label="Your question"
                required
                fullWidth
                variant="outlined"
                inputRef={questionRef}
                multiline={true}
                rows={5}
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
