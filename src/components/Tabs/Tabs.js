import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import '../../App.css'

export default function BranchTabs(props) {
  console.log(props.value)
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const handleChange = (event, newValue) => {
    setValue(props.value);
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Link className="links" to="/DiscussionForums/general"><Tab label="General" /></Link>
        <Link className="links" to="/DiscussionForums/Civil"><Tab label="Civil" /></Link>
        <Link className="links" to="/DiscussionForums/CSE"><Tab label="CSE" /></Link>
        <Link className="links" to="/DiscussionForums/EEE"><Tab label="EEE" /></Link>
        <Link className="links" to="/DiscussionForums/ECE"><Tab label="ECE" /></Link>
        <Link className="links" to="/DiscussionForums/Mechanical"><Tab label="Mechanical"/></Link>
      </Tabs>
    </Paper>
  );
}
