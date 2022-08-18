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
            <div className="logo"  onClick={handleClick}>
                <img src={img}/>
                <p>ProPla</p>
            </div>
            <div className="links">
                <Link to="/list">Home</Link>
                <Link to="/login">Log Out</Link>
            </div>
        </div>
    )
}

export default Header