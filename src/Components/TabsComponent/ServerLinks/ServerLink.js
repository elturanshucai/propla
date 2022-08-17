import React from 'react'
import './ServerLink.css'

function ServerLink(){
    return (
        <>
            <table className='table-3' cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <td>Server IP</td>
                        <td>Server Port</td>
                        <td>Server Type Name</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>10.3421.10.9</td>
                        <td>432.5342.8088</td>
                        <td>Sinaq ucun yazi</td>
                    </tr>
                    <tr>
                        <td>10.3421.10.9</td>
                        <td>432.5342.8088</td>
                        <td>Sinaq ucun yazi</td>
                    </tr>
                    <tr>
                        <td>10.3421.10.9</td>
                        <td>432.5342.8088</td>
                        <td>Sinaq ucun yazi</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ServerLink