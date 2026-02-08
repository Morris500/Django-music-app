import React, {Component, useState} from "react";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
 import { Link, useNavigate } from "react-router-dom";

const CreateRoomPage = (props)=> {
const defaultVotes = 2;

const navigate = useNavigate();

 const [room, setRoom] = useState({
  guest_can_pause: true,
  votes_to_skip: defaultVotes,
});

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
// const HandelVotesChange = (e)=> {
// setRoom((prev) => ({
//     ...prev,
//     votes_to_skip: e.target.value}));
// } 

// const HandelGuestCanPausechange = (e) =>{
// setRoom((prev) => ({
//     ...prev,
//     guest_can_Pause: e.target.value === "true" ?true : false}));
// }  

const HandelRoomButtonClicked = () =>{

    const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify(room)
    
}
fetch("/api/create-room", requestOptions).then((res)=>{
    res.json().then((data)=> {
        //console.log(data)
        
          navigate('/room/' + data.code)
    }
)  
})
}
//  console.log("X-CSRFToken :", csrftoken);



     return <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component= "h4" variant='h4'>create a room</Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl>
                <FormHelperText>
                    <div align='center'>Guest Control play back state</div>
                </FormHelperText>
                <RadioGroup row required defaultValue={room.guest_can_pause.toString()} onChange={(e) => setRoom((prev) => ({
      ...prev,
      guest_can_pause: e.target.value === "true",
    }))
  }>
                    <FormControlLabel value='true' control={<Radio color='primary'/>}
                    label='Play/Pause'
                    labelPlacement='bottom'
                    /> 
                     <FormControlLabel value='false' control={<Radio color='secondary'/>}
                    label='No Control'
                    labelPlacement='bottom'
                    /> 

                </RadioGroup>
            </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl>
                <TextField required  onChange={(e) => setRoom((prev) => 
                ({ ...prev,
                    votes_to_skip: Number(e.target.value),
                }))
  } type="number" defaultValue={room.votes_to_skip}
                inputProps={{
                    min:1, 
                    style: {textAlign: "center"}
                }}
                />
                <FormHelperText>
                    <div align="center">Votes Required To Skip Song</div>
                </FormHelperText>
            </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
            <Button color="primary" variant = "contained" onClick={HandelRoomButtonClicked}>Create A Room</Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
        </Grid>
    </Grid>
   
}

export default CreateRoomPage;