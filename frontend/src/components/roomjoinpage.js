import React, {Component, useState} from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

 
const RoomJoinPage = () => {

   const [room, setRoom] = useState({roomCode:"", error: ""}) 

   const navigate = useNavigate();

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

   const roomButtonPressed = () =>{
    const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({code:room.roomCode})
    
}
fetch("/api/join-room", requestOptions).then((res)=>{
    if (res.ok) {
        //console.log(data)
        //console.log(room.roomCode);
          
          navigate(`/room/${room.roomCode}` )
          
    }
    else {
        setRoom({error: "rOOM NOT foUND"})
    }
}).catch((error) => {console.log(error);
})
   }

    return <Grid container spacing="1" alignItems="center">
        <Grid item xs="12" alignItems="center">
            <Typography variant="h4" component="h4">Join a Room</Typography>
        </Grid>
        <Grid item xs='12'>
            <TextField error={room.error} label="code" placeholder="Enter a Room Code" value={room.roomCode} helperText={room.error} variant="outlined" onChange={(e)=> {setRoom((prev)=>({ ...prev, roomCode: e.target.value

      }))}}
            />
        </Grid>
                <Grid item xs="12" alignItems="center"> 
                    <Button variant="contained" color="primary" onClick={roomButtonPressed} >Enter Room </Button>
                </Grid>
                        <Grid item xs="12" alignItems="center">
                            <Button variant="contained" color="secondary" to="/" component={Link} > Back </Button>
                        </Grid>



    </Grid>
}

export default RoomJoinPage;