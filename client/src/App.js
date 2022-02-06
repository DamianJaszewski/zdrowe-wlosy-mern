import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => (
    <BrowserRouter>
        <Container maxWidth="lg">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} ></Route>
                <Route path="/posts/search" element={<Home/>}/>
                <Route path="/auth" element={<Auth />} ></Route>
            </Routes>
        </Container>
    </BrowserRouter>
);

export default App;