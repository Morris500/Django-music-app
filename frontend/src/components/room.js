import React, {Component, useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";

const Room = (props) =>{

const navigate = useNavigate();    

const [state, setState]= useState({votes_to_skip: null, guest_can_pause: null, is_host: false,});   

    const {roomCode} = useParams();
//console.log(roomCode);

useEffect(() => {
    fetch("/api/get-room?code=" + roomCode).then((res)=>{
        res.json().then((data)=>{
            setState({
                voteToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })
        })
    })
}, [roomCode]);
console.log(state);

const leaveButton = () =>{
     const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
}
fetch("/api/Leave_room", requestOptions).then((res)=>{
    if (res.ok) {
          navigate(`/`)
    }
    else {
        console.log({error: "can not redirect"})
    }
}).catch((error) => {console.log(error)})
}

return <Grid container spacing={1}>
    <Grid item xs='12' align='center'>
        <Typography variant="h4" component="h4">
            Code: {roomCode}
        </Typography>
    </Grid>
    <Grid item xs='12' align='center'>
        <Typography variant="h6" component="h6">
            Votes: {state.voteToSkip}   
        </Typography>
    </Grid>
    <Grid item xs='12' align='center'>
        <Typography variant="h6" component="h6">
            Guest Can Pause:{state.guestCanPause?.toString()}
        </Typography>
    </Grid>
    <Grid item xs='12' align='center'>
        <Typography variant="h6" component="h6">
            Host: {state.isHost?.toString()}
        </Typography> 
    </Grid>
    <Grid item xs='12' align='center'>
        <Button variant="contained" color="secondary" onClick={leaveButton}>Leave Room</Button>
    </Grid>


</Grid>
{/* <div> 
    <h1>hello room</h1>
    <h3>{roomCode}</h3> 
    <p>Votes: {state.voteToSkip}</p>
    <p></p>
    <p></p>
</div> */}

}

export default Room;