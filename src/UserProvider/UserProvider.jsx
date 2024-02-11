import React, {useEffect, useState} from 'react';
import UserContext from './UserContext';

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
        setIsLogged(true)
    }

    useEffect(() => {
        // let user = localStorage.getItem('userData') === 'undefined' ?  undefined : JSON?.parse(localStorage?.getItem('userData'));
    }, []);

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