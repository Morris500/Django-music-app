import React, {Component, useState} from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Link, Redirect, Routes, } from "react-router-dom";
import CreateRoomPage from "./createroompage.js";
import RoomJoinPage from "./roomjoinpage.js";


const Homepage = () => {


    return <Router>
        <Routes>
            <Route path="/" element={<p>this is the Homepage</p>} />
            <Route path="/join" element={<RoomJoinPage />} />
            <Route path="/Create" element={<CreateRoomPage />} />
        </Routes>
    </Router>
}


export default Homepage