import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    spacing: 1
  },
  avatar: {
    backgroundColor: red[500],
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
      <div>
          <br></br>
    <Card width='80%'  style={{backgroundColor: "rgb(250,250,250)"}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src="../Home/icons8-customer-48.png" className={classes.avatar}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.author}
        subheader={props.timestamp}
      />
      <CardContent>
        <Typography style={{fontSize:"1rem"}} variant="body2" color="textPrimary" component="p">
        {props.reply}
        </Typography>
      </CardContent>    
    </Card>
    </div> 
  );
}