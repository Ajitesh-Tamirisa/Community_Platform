import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import FormDialog from '../OppsDialog/OppsDialog';
import { makeStyles } from '@material-ui/core/styles';
import OppsCard from '../Card/OppsCard'
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { api } from "../../api";
import '../../App.css'


function Opportunities() {
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
    const styles = {
    fullHeightCard: {
        height: "100%",
        },
    }
    
    async function getResults(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(api+"opportunities/view", requestOptions)
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
            <h1 className="jumbo__h1">Opportunities</h1>
            <p className="jumbo__p">
                Check out all the exciting opportunites posted by your faculty!
            </p>
            </div>
            {result ? (<div  className="content" style={{width:"70%", marginBottom:"65px"}}>
            {localStorage.getItem("userType") == 2 ? <div><br></br><FormDialog/><br></br></div> : <br></br>}
            <Grid container direction={'row'}  alignItems="stretch" spacing={2}>
                {Object.keys(result).reverse().map(function(key, index) {
                            return (                            
                                <Grid className="card" style={{display: 'flex'}} item xs={12} sm={4}>
                                    <span style={{marginTop:"35px"}}>
                                        <Link to={`/Opportunities/${result[key].postId}`} className="links"><OppsCard author={result[key].author} timestamp={result[key].timestamp} title={result[key].title} flag={true}/></Link>
                                    </span>
                                </Grid>
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
