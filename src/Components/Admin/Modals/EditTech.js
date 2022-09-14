import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import '../Admin.css'

function EditTech({ data, setEdit, getTech, projectId }) {

    const [tech, setTech] = useState({
        ...data,
        projectId: projectId
    })

    const handleChange = (e) => {
        setTech({
            ...tech,
            [e.target.name]: e.target.value,
            projectId: projectId
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(tech);
        axios.put(process.env.REACT_APP_TECHSTACK_API, tech).then(data => {
            if (data.status === 200) {
                toast.info('Məlumatlar dəyişdirildi', {
                    theme: "colored"
                })
                setEdit(false)
                getTech()
            }
        }).catch(err => {
            toast.error('Xəta baş verdi', {
                theme: "colored"
            })
            console.log(err)
        })
    }

    return (
        <>
            <div className="edit-div-modal">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="tech">Tech Name</label>
                    <input
                        id="tech"
                        name="programName"
                        type="text"
                        defaultValue={data?.programName}
                        onChange={(e) => handleChange(e)}
                        required
                    />

                    <div className="form-foot">
                        <div>
                            <button
                                className="btn-new"
                                type="submit"
                            >
                                Change
                            </button>
                            <button className="close-btn" type="button" onClick={() => setEdit(false)}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditTech