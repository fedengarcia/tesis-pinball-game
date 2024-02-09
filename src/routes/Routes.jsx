import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import App from '../App'
import PinballGame from '../pages/PinballGame';
import EndGame from '../pages/EndGame';

export default function Routes () {
    return (
        <ReactRoutes >
            <Route
                exact path={'/'}
                element={<App/>} />
            <Route
                exact path={'/pinball-game'}
                element={<PinballGame/>} />
            <Route
                exact path={'/end-game'}
                element={<EndGame/>} />

        </ReactRoutes>
    )
};

