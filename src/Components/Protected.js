import React from "react";
import {useNavigate } from "react-router-dom"

function Protected({ login, children }) {
    const navigate = useNavigate()

    if(login){
        return children
    }
    else{
        window.location.href = 'login';
    }
}

export default Protected