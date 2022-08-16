import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import "./Header.css"
import img from '../../logo_transparent.png'
function Header(){
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate('/list')
    }
    return  (
        <div className="head">
            <img src={img} onClick={handleClick} />
            <div className="links">
                <Link to="/list">Home</Link>
                <Link to="/login">Log Out</Link>
            </div>
        </div>
    )
}

export default Header