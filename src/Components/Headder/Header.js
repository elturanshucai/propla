import React from "react";
import {Link} from 'react-router-dom'
import "./Header.css"
function Header(){
    return  (
        <div className="head">
            <img src="../../logo_transparent.png" />
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/login">Log Out</Link>
            </div>
        </div>
    )
}

export default Header