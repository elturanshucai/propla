import React from "react";
import './Project.css'

function ProjectUser(){
    return (
        <>
            <table className="projectusers" cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Surname</td>
                        <td id="mail">Mail</td>
                        <td>Office Number</td>
                        <td>Personal Number</td>
                        <td>Position Name</td>
                        <td>Dev Type Name</td>
                        <td>Project User Description</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Elturan</td>
                        <td>Shucai</td>
                        <td>elturanfcb@gmail.com</td>
                        <td>1313</td>
                        <td>070-712-06-12</td>
                        <td>Front End</td>
                        <td>Bilmirem</td>
                        <td>Aciqlama yoxdur</td>
                    </tr>
                    <tr>
                        <td>Elturan</td>
                        <td>Shucai</td>
                        <td>elturanfcb@gmail.com</td>
                        <td>1313</td>
                        <td>070-712-06-12</td>
                        <td>Front End</td>
                        <td>Bilmirem</td>
                        <td>Aciqlama yoxdurAciqlama yoxdurAciqlama yoxdur</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ProjectUser