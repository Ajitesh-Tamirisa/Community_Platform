import React from 'react';
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
    spacing: 2
  },
  avatar: {
    backgroundColor: red[500],
  },
  question: {
      fontWeight:700,
      fontSize: '1.5rem'
  }
}));

export default function RecipeReviewCard({author, timestamp, question, flag}) {
  const classes = useStyles();

  return (
    <Card width='80%' style={{backgroundColor: "rgb(250,250,251)"}}>
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
        title={author}
        subheader={timestamp}
      />
      <CardContent>
        <Typography className={classes.question} variant="body2" color="textPrimary" component="p">
          {question}
        </Typography>
        {flag? <div style={{color: "blue", marginTop:"25px"}}>View replies →</div> : <span></span>}
      </CardContent>
    </Card>
  );
}
