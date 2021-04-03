import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import FormDialog from './AnnDialog';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import OppsCard from '../Card/OppsCard'
import Grid from '@material-ui/core/Grid';
import {Jumbotron} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { api } from "../../api";
import Tooltip from '@material-ui/core/Tooltip';
import '../../App.css'


function Opportunities() {
    // console.log(getTimestamp())
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
        
        return <Tooltip arrow classes={classes} {...props} />;
    }
    console.log(new Date().toUTCString())
    const [result, setResult] = useState([])
    const handleSend = () => {
        let x = document.getElementById("img");
        console.log(x.files[0])
      };
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        }
      }));
    
    async function getResults(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(api+"announcements/view", requestOptions)
            .then(response => response.json())
            .then(res => {
                console.log(res)
                if(res.status==200){
                    setResult(res.result)
                }
                else{
                    alert("Could not fetch data. Please try again later.")
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getResults();
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="jumbo">
            <h1 className="jumbo__h1">Announcements</h1>
            <p className="jumbo__p">
                Stay updated with announcements from college. View all official announcements at one place!
            </p>
            </div>
            {/* <FormDialog/> */}
            {/* <AnnCard/> */}
            {result ? (<div  className="content" style={{width:"68%"}}>
            {localStorage.getItem("userType") == 2 ? <div><br></br><FormDialog/><br></br></div> : <br></br>}
            <Grid container spacing={2}>
                {Object.keys(result).reverse().map(function(key, index) {
                            return (
                                <span style={{width:"100%"}}  className="card">
                                    <OppsCard author={result[key].author} timestamp={result[key].timestamp} title={result[key].title} content={result[key].content} link={result[key].link} imageUrl={result[key].imageUrl} image={(result[key].imageUrl=="-")?false:true}/>
                                </span>
                            )
                        })}
                        
            </Grid>
            
            {/* <input id="img" type="file" accept="image/*" ></input>
            <button onClick={handleSend}>Send</button> */}
            </div>) : <div>No results</div>}
        
        </div>
    )
}

export default Opportunities
