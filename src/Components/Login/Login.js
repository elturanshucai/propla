import React from "react";
import "./Login.css"

function Login(){
    console.log('a');
    return (
        <div className="login">
            <div className="login-left">PROPLA</div>
            <div className="login-right">
                <div className="box">
                    <div className="box-inner">
                        <form>
                            <h2>Sign In</h2>
                            <input placeholder="username*"/>
                            <input placeholder="password*" />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login