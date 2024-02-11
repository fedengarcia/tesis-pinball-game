import React, {useEffect, useState} from 'react';
import UserContext from './UserContext';
import { APP_DATA } from '../CONSTANTS';

export const UserProvider = ({children}) => {
    const [isLogged, setIsLogged]= useState(false);
    const [userInfo, setUserInfo] = useState({
        email: ''
    })


    
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const validation = regex.test(email);
        return validation
    }   

    const handleLogin = () => {
        let exist = false
        let userInfoCopy = {...userInfo}
        if(exist){

        }else{
            let tables = APP_DATA.APP_GAME.GAME_CONFIGURATION.tables
            userInfoCopy.tableAssigned = tables[Math.floor(Math.random() * tables.length)]
            userInfoCopy.date = new Date();
            userInfoCopy.totalPoints = 0
            userInfoCopy.gameTime = 0
        }
        // Check email in firebase
        setUserInfo(userInfoCopy)
        setIsLogged(true)
    }

    useEffect(() => {
        console.log(userInfo)
        // let user = localStorage.getItem('userData') === 'undefined' ?  undefined : JSON?.parse(localStorage?.getItem('userData'));
    }, [userInfo]);

    return (
        <UserContext.Provider value={{
            userInfo,
            setUserInfo,
            validateEmail,
            isLogged,
            handleLogin
        }}>
            {children}
        </UserContext.Provider>
    )
}