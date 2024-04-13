import React, {useEffect, useState} from 'react';
import UserContext from './UserContext';
import { APP_DATA } from '../CONSTANTS';
import { createUserDocument, getUserByEmail } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export const UserProvider = ({children}) => {
    const COOKIE_NAME = 'tesis_user_logged'
    const [isLogged, setIsLogged]= useState(false);
    const [userInfo, setUserInfo] = useState({})
    const [loadingLogin, setLoadingLogin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const cookieEmail =  getCookie()
        if(cookieEmail?.email) {
          handleLogin(cookieEmail?.email)
        }
    }, []);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const validation = regex.test(email);
        return validation
    }   

    const handleLogin = async (email) => {
        setLoadingLogin(true)
        let userInfoCopy = {...userInfo}
        let userExistingData = await getUserByEmail(email)
        if(userExistingData){
            userInfoCopy = {...userExistingData}
        }else{
            try {
                // Check email in firebase
                let tables = APP_DATA.APP_GAME.GAME_CONFIGURATION?.tables
                userInfoCopy.tableAssigned = tables[Math.floor(Math.random() * tables?.length)]
                userInfoCopy.date = new Date();
                userInfoCopy.gamesPlayed = []
                userInfoCopy.firstForm = {
                    isCompleted: false
                }
                userInfoCopy.secondForm = {
                    isCompleted: false
                }
                userInfoCopy.thirdForm = {
                    isCompleted: false
                }
                userInfoCopy.finalForm = {
                    isCompleted: false
                }
                if(userInfoCopy.email) {
                    const res = await createUserDocument(userInfoCopy)
                    userInfoCopy.id = res.id
                }
            } catch (error) {
                console.log(error)
                setLoadingLogin(false)
                window.location.reload()
            }
        }
        setCookie({
            email: email,
        })
        setUserInfo(userInfoCopy)
        setIsLogged(true)
        setLoadingLogin(false)
        if(window.location.pathname !=="/admin-javiT2024" && userInfoCopy.id){
            navigate('/first-form')
        }
    }

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