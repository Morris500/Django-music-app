import React, {Component, useState, useEffect} from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import CreateRoomPage from "./createroompage.js";
import RoomJoinPage from "./roomjoinpage.js";
import Room from "./room.js";
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core";


const Homepage = () => {

    const [roomcode, setroomcode] = useState(null)


    useEffect(() => {
    fetch("/api/user-in-room").then((res)=>{
            res.json().then((data)=>{
                setroomcode(data.code)
                console.log(data);
                
             })
        })
    }, []);

const clearRoomcode = () =>{
    setroomcode(null)
} 

// console.log(state);


   const renderHomePage = ()=> {
    return(
        <Grid container spacing='3'>
            <Grid item xs='12' align='center'>
                <Typography variant="h3" compact='h3'>House Party</Typography>
            </Grid>

            <Grid item xs='12' align='center'>
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to='/join' component={Link}>
                    Join a Room </Button>

                    <Button color="secondary" to='/Create' component={Link}>
                    Create a Room </Button>
                </ButtonGroup>
            </Grid>

        </Grid>

        
    )
    }

    return <Router>
        <Routes>
            <Route path="/" element={roomcode ? <Navigate to={`/room/${roomcode}`}  /> : renderHomePage()} />
            <Route path="/join" element={<RoomJoinPage />} />
            <Route path="/Create" element={<CreateRoomPage />} />
            <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomcode}/>} />
        </Routes>
    </Router>
}


export default Homepage