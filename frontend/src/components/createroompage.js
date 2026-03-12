import React, {Component, useState} from "react";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Collapse } from "@material-ui/core";
 import { Link, useNavigate } from "react-router-dom";
 

const CreateRoomPage = ({
    votesToSkip = 2,
    guestCanPause = true,
    update = false,
    roomCode = null,
    updateCallback = () => {}
}) => {


const navigate = useNavigate();

 const [room, setRoom] = useState({
  guest_can_pause: guestCanPause,
  votes_to_skip: votesToSkip,
  succesMSG:"",
  errorMSG:"",
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

function CreateButton (){
    return(
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Button color="primary" variant = "contained" onClick={HandelRoomButtonClicked}>Create A Room</Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
        </Grid>
    </Grid>)
}

function UpdateButton (){
    return(
        <Grid item xs={12} align="center">
            <Button color="primary" variant = "contained" onClick={HandelUpdateButtonClicked}>Update Room</Button>
        </Grid>
        )
    }
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

const HandelUpdateButtonClicked = () =>{
console.log({
        guest_can_pause:room.guest_can_pause,
        votes_to_skip:room.votes_to_skip,
        Code:roomCode
    });

    const requestOptions = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
        guest_can_pause:room.guest_can_pause,
        votes_to_skip:room.votes_to_skip,
        code:roomCode
    })
    
    
}
fetch("/api/update-room", requestOptions).then((res)=>{
    console.log(res)
    if (res.ok) {
        setRoom({succesMSG:"Room Update Successful"})
    } else {
        setRoom({errorMSG:"Error Updating Room"})
    }
        updateCallback();
    }
    
)  
}


const HandelRoomButtonClicked = () =>{

    const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
        guest_can_pause:room.guest_can_pause,
        votes_to_skip:room.votes_to_skip})
    
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

const title = update ? "Update Room" : "Create Room";

 return <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Collapse in={room.succesMSG != "" || room.errorMSG != ""}>{room.succesMSG = "Room Update Successful" ? room.succesMSG : room.errorMSG } </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography component= "h4" variant='h4'>{title}</Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl>
                <FormHelperText>
                    <div align='center'>Guest Control play back state</div>
                </FormHelperText>
                <RadioGroup row required defaultValue={guestCanPause.toString()} onChange={(e) => setRoom((prev) => ({
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
  } type="number" defaultValue={votesToSkip}
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
        { update ? <UpdateButton /> : <CreateButton /> }
    </Grid>
   
}

export default CreateRoomPage;