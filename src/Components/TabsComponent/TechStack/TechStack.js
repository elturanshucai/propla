import React from "react";
import './TechStack.css'

function TechStack(){
    return (
        <>
            <table className="tech" cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>HTML</td>
                    </tr>
                    <tr>
                        <td>CSS</td>
                    </tr>
                    <tr>
                        <td>JavaScript</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default TechStack