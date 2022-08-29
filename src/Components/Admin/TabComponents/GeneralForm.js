import React from "react";
import '../admin.css'

function GeneralForm(){
    return (
        <>
            <form>
                <label htmlFor="prjname">Project Full Name</label>
                <input id="prjname" type="text" />
                <label htmlFor="desc">Project Description</label>
                <input id="desc" type="text" />
                <label htmlFor="create">Created By</label>
                <input id="create" type="text" />
                <label htmlFor="date">Production Date</label>
                <input id="date" type="date" />
                <label htmlFor="count">Project User Count</label>
                <input id="count" type="number" />
                <button className="btn-new" type="submit">Submit</button>
            </form>
        </>
    )
}

export default GeneralForm