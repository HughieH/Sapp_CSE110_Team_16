// src/HomePage.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const HomePage = () => {

    return (
        <Router>
            <h1>SAPP</h1>
            <h4>the best study pal in the world...</h4>
        </Router>
    );
};

export default HomePage;