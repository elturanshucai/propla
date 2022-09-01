import React from "react";
import './Loading.css'

function Loading() {
    return (
        <>
            <div className="loading">
                <div className="dots">
                    <div className="dot dot1"></div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                </div>
            </div>
        </>
    )
}

export default Loading