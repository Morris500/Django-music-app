import React, {Component, useState} from "react";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
 import { Link } from "react-router-dom";

const CreateRoomPage = ()=> {
const defaultVotes = 2;
 const [code, SetChange ] = useState("");

const HandelVotesChange = (e)=> {
SetChange((prev) => ({
    ...prev, 
    VotesTOSkip: e.target.value}));
} 

const HandelGuestCanPausechange = (e) =>{
SetChange((prev) => ({
    ...prev,
    guestCanPause: e.target.value === "true" ?true : false}));
} 

const HandelRoomButtonClicked = (e) =>{
console.log(code);

}

     return <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component= "h4" variant='h4'>create a room</Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <FormControl>
                <FormHelperText>
                    <div align='center'>Guest Control play back state</div>
                </FormHelperText>
                <RadioGroup row defaultValue="true" onChange={HandelGuestCanPausechange}>
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
                <TextField required onChange={HandelVotesChange} type="number" defaultValue={defaultVotes}
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