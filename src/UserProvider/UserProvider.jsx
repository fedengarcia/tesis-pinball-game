import React, {useEffect, useState} from 'react';
import UserContext from './UserContext';
import { APP_DATA } from '../CONSTANTS';
import { createUserDocument, getUserByEmail } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export const UserProvider = ({children}) => {
    const COOKIE_NAME = 'tesis_user_logged'
    const [isLogged, setIsLogged]= useState(false);
    const [userInfo, setUserInfo] = useState({
        email: ''
    })
    const [loadingLogin, setLoadingLogin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo.email === '') navigate('/')
    }, [userInfo]);


    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const validation = regex.test(email);
        return validation
    }   

    const handleLogin = async (cookieEmail) => {
        setLoadingLogin(true)
        let userInfoCopy = {...userInfo}
        let userExistingData = await getUserByEmail(cookieEmail ? cookieEmail : userInfo.email)

        // Check email in firebase
        if(userExistingData){
            userInfoCopy = {...userExistingData}
        }else{
            let tables = APP_DATA.APP_GAME.GAME_CONFIGURATION.tables
            userInfoCopy.tableAssigned = tables[Math.floor(Math.random() * tables?.length)]
            userInfoCopy.date = new Date();
            userInfoCopy.gamesPlayed = []
            userInfoCopy.firstForm = {
                isCompleted: false
            }
            userInfoCopy.finalForm = {
                isCompleted: false
            }
            await createUserDocument(userInfoCopy)
        }
        setCookie({email: cookieEmail ? cookieEmail : userInfo.email})
        setUserInfo(userInfoCopy)
        setIsLogged(true)
        setLoadingLogin(false)
    }

    useEffect(() => {
        console.log(userInfo)
        // let user = localStorage.getItem('userData') === 'undefined' ?  undefined : JSON?.parse(localStorage?.getItem('userData'));
    }, [userInfo]);


    
    const getCookie = () => {
        const decodedCookie = decodeURIComponent(document.cookie);
        const inicioJson = decodedCookie.indexOf('{');
        const finJson = decodedCookie.lastIndexOf('}');
        const jsonStr = decodedCookie.slice(inicioJson, finJson + 1);
        if(jsonStr) return JSON.parse(jsonStr);

        return null;
    }

    const setCookie = (value) => {
        document.cookie = COOKIE_NAME + "=" + JSON.stringify(value);
    }

    const unsetCookie = () => {
        document.cookie = COOKIE_NAME + ',Expires=Thu, 01 Jan 1970 00:00:01 GMT,';
    }


    return (
        <UserContext.Provider value={{
            userInfo,
            setUserInfo,
            validateEmail,
            isLogged,
            setIsLogged,
            loadingLogin,
            setLoadingLogin,
            handleLogin,
            getCookie
        }}>
            {children}
        </UserContext.Provider>
    )
}