import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import "./Header.css"
import img from '../../logo_transparent.png'
import { fnLogout } from "../../Store/reducers/projectReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon, faClose } from "@fortawesome/free-solid-svg-icons";
function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [menu, setMenu] = useState(false)

    const handleClick = () => {
        navigate('/')
    }

    const logout = () => {
        dispatch(fnLogout())
        localStorage.removeItem('token')
        localStorage.removeItem('page')
    }


    return (
        <>
            <div className="head">
                <div className="logo" onClick={handleClick}>
                    <img src={img} />
                    <p>ProPla</p>
                </div>
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/login" onClick={logout}>Log Out</Link>
                </div>

                {
                    menu ? 
                    <FontAwesomeIcon icon={faClose} color="white" size="2x" onClick={()=>setMenu(false)} className="menuicon" />:
                    <FontAwesomeIcon icon={faNavicon} color="white" size="2x" onClick={()=>setMenu(true)} className="menuicon" />
                }
                
            </div>

            {
                menu && 
                <div className="menu">
                    <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/login" onClick={logout}>Log Out</Link>
                    </div>
                </div>
            }

        </>
    )
}

export default Header