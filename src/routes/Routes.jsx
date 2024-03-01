import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import App from '../App'
import Game from '../pages/Game';
import EndGame from '../pages/EndGame';
import FirstForm from '../pages/FirstForm';
import LastForm from '../pages/LastForm';
import Admin from '../pages/Admin';

export default function Routes () {


    return (
        <ReactRoutes>
            <Route exact path={'/admin-javiT2024'} element={<Admin/>} />
            <Route exact path={'/'} element={<App/>} />
            <Route exact path={'/first-form'} element={<FirstForm/>} />
            <Route exact path={'/game'} element={<Game/>} />
            <Route exact path={'/final-form'} element={<LastForm/>} />
            <Route exact path={'/end-game'} element={<EndGame/>} />
        </ReactRoutes>
    )
};

