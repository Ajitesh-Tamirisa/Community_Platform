import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    spacing: 2
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
      fontWeight:700,
      fontSize: '1.2rem'
  }
}));
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();
  
  return <Tooltip arrow placement="top" classes={classes} {...props} />;
}

export default function RecipeReviewCard({author, timestamp, title, content, link, flag, imageUrl, image}) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src="../Home/icons8-customer-48.png" className={classes.avatar}>
          </Avatar>
        }
        title={author}
        subheader={timestamp}
      />
      {image? <BootstrapTooltip title="Click to view full size image"><a href={imageUrl}><CardMedia style={{objectFit: "cover"}}
          component="img"
          alt="Contemplative Reptile"
          height="220"
          image={imageUrl}
        /></a></BootstrapTooltip>: <span></span>}
      <CardContent>
        <Typography className={classes.title} variant="body2" color="textPrimary" component="p">
            {title}
        </Typography><br></br>
        <Typography variant="body2" color="textPrimary" component="p">
            {content}
        </Typography><br></br>
        <a href={link}>{link}</a>
        {flag? <div style={{color: "blue"}}>Learn More →</div> : <span></span>}
      </CardContent>
    </Card>
  );
}
