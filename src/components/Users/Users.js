import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AdminNavbar from "../Navbar/AdminNavbar"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {api} from "../../api"
import { Button } from '@material-ui/core';
import '../../App.css'

function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading]=useState(false)
    const useStyles = makeStyles({
        table: {
          minWidth: 650
        },
      });
    const deleteUser = (id)=>{
        setLoading(true)
        console.log(id)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"userId":""+id});
        console.log(raw)
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(api+"admin/delete_user", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status == 200){
                alert("User Deleted successfully!")
                setLoading(false)
                window.location.reload()
            }
            else{
                alert("Could not delete user!Please try again later.")
            }
        })
        .catch(error => console.log('error', error));

    }
    async function getUsers(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(api+"admin/all_users", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status == 200){
                    setUsers(result.users)
                }
                else{
                    alert("Error fetching data. Please try again later.")
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getUsers();
    }, [])
    const classes = useStyles();
    return (
        <div>
            <AdminNavbar/>
            <div className="content">
                <br/>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Users table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>User Type</TableCell>
                        <TableCell>Delete Account</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((row) => (
                        <TableRow id={`row_${row.userId}`} key={row.userId}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.userId}</TableCell>
                        <TableCell>{row.userType}</TableCell>
                        <TableCell><Button id={row.userId} variant="contained" onClick={() => deleteUser(row.userId)} disabled={loading}>Delete user</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Users
