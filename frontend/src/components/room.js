import React, {Component, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

const Room = (props) =>{

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


return <div> 
    <h1>hello room</h1>
    <h3>{roomCode}</h3> 
    <p>Votes: {state.voteToSkip}</p>
    <p>Guest Can Pause:{state.guestCanPause?.toString()}</p>
    <p>Host: {state.isHost?.toString()}</p>
</div>

}

export default Room;