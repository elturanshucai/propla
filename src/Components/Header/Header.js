import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "./Header.css"
import img from '../../images/logo_transparent.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon, faClose } from "@fortawesome/free-solid-svg-icons";
function Header() {

    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)

    const handleClick = () => {
        navigate('/')
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('page')
    }


    return (
        <>
            <div className="head">
                <div className="logo" onClick={handleClick}>
                    <img src={img} alt='' />
                    <p>ProPla</p>
                </div>
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/login" onClick={logout}>Log Out</Link>
                </div>

                {
                    menu ?
                        <FontAwesomeIcon icon={faClose} color="white" size="2x" onClick={() => setMenu(false)} className="menuicon" /> :
                        <FontAwesomeIcon icon={faNavicon} color="white" size="2x" onClick={() => setMenu(true)} className="menuicon" />
                }

            </div>

            {
                menu &&
                <div className="menu">
                    <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/admin">Admin</Link>
                        <Link to="/login" onClick={logout}>Log Out</Link>
                    </div>
                </div>
            }

        </>
    )
}

export default Header