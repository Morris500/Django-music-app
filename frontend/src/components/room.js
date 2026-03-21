import React, {Component, useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./createroompage.js";
import MusicPlayer from "./MusicPlayer.js";

const Room = (props) =>{

const navigate = useNavigate();    

const [state, setState]= useState({votes_to_skip: null, guest_can_pause: null, isHost: false, showSettings: false, spotify_authenticated: false, song: {}});   

    const {roomCode} = useParams();
console.log(roomCode);

function componentDidMount() {
    interval = setInterval(getCurrentSong, 1000);
}
function componentWillUnmount(){
    clearInterval(interval)
}
function getRoomDetails() {
    return fetch("/api/get-room?code=" + roomCode).then((res)=>{ 
        if (!res.ok) {
        props.leaveRoomCallback();
        navigate("/") 
        }
        return res.json()
    }).then((data)=>{
            setState({
                votes_to_skip: data.votes_to_skip,
                guest_can_pause: data.guest_can_pause,
                isHost:data.is_host,
            })    
        
      if (data.is_host) {
                authenticteSpotify();
            }

    })
}
function authenticteSpotify() {
    fetch('/spotify/is_authenticated').then((res)=> res.json()).then((data) => {
        setState({spotifyAuthenticated:data.status})
        
        if (!data.status) {
        fetch('/spotify/get-auth-url').then((res) => res.json()).then((data) =>{window.location.replace(data.url)})
    }
  })
}
useEffect(() => {
    getRoomDetails();
}, [roomCode, navigate]);
//console.log(state);

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie("csrftoken");

const getCurrentSong= ()=> {
    fetch('/spotify/current-song').then((res)=>{
        if (!res.ok) {
            return {};
        } else {
            return res.json();
        }
    }).then((data) =>{
        setState({song: data})
    })
}

const leaveButton = () =>{
     const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
    },
}
fetch("/api/leave_room", requestOptions).then((res)=>{
    if (res.ok) {
        props.leaveRoomCallback();
         navigate(`/`)
    }
    else {
        console.log({error: "can not redirect"})
    }
}).catch((error) => {console.log(error)})
}

const updateShowSetting = (value) => {
    setState({showSettings: value,
    })
}

function renderSetting () {
return <Grid container spacing={1}>
    <Grid item xs={12} align="center">
        <CreateRoomPage update={true} voteToSkip={state.votes_to_skip} guestCanPause={state.guest_can_pause} roomCode={roomCode} updateCallback={getRoomDetails}/>
    </Grid>
    <Grid item xs={12} align="center">
        <Button variant='contained' color='secondary' onClick={() => updateShowSetting(false)}>Close</Button>
    </Grid>

</Grid>
}

function renderSettingButton(){
    return <Grid  item xs={12} align="center">
        <Button variant='contained' color='primary' onClick={() => updateShowSetting(true)}>Settings</Button>
    </Grid>
}
if (state.showSettings) {
    return renderSetting()
} 
return <Grid container spacing={1}>
    <Grid item xs='12' align='center'>
        <Typography variant="h4" component="h4">
            Code: {roomCode}
        </Typography>
    </Grid>
    <MusicPlayer {...state.song}/>
    {state.isHost ? renderSettingButton() : null}
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

{/* <Grid item xs='12' align='center'>
        <Typography variant="h6" component="h6">
            Votes: {state.votes_to_skip}   
        </Typography>
    </Grid>
    <Grid item xs='12' align='center'>
        <Typography variant="h6" component="h6">
            Guest Can Pause:{state.guest_can_pause?.toString()}
        </Typography>
    </Grid>
    <Grid item xs='12' align='center'>
        <Typography variant="h6" component="h6">
            Host: {state.isHost?.toString()}
        </Typography> 
    </Grid> */}