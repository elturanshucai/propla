import React from 'react'
import "./General.css"

function GeneralInfo() {
    return (
        <>
            <table className='general-info'>
                <thead>
                    <tr>
                        <td>Project Full Name</td>
                        <td>Project Description</td>
                        <td>Created By</td>
                        <td>Production Date</td>
                        <td>Project User Count</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ünvan Reyestri İnformasiya Sistemi</td>
                        <td>Ünvan məlumatlarının idarə edilməsi sistemi</td>
                        <td>ITMIM</td>
                        <td>2019-09-16</td>
                        <td>129</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default GeneralInfo