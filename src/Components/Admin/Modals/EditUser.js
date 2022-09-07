import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import '../Admin.css'

function EditUser({ getData, setModal, id, data }) {

    const formik = useFormik({
        initialValues: {
            name: data?.name,
            surname: data?.surname,
            mail: data?.mail,
            officeNumber: data?.officeNumber,
            personalNumber: data?.personalNumber,
            positionName: data?.positionName,
            role: data?.role?.roleName,
            userId: id
        },
        onSubmit: async values => {
            axios.put(`http://10.1.14.29:81/api/User`, values).then(data => {
                if (data.status === 200) {
                    setModal(false)
                    getData()
                }
            }).catch(err => console.log(err))
            console.log(values);
        }
    })

    useEffect(() => {
        if (formik.values.role.toLowerCase() === 'user') {
            formik.setValues({
                ...formik.values,
                roleId: 0
            })
        }
        else if (formik.values.role.toLowerCase() === 'admin') {
            formik.setValues({
                ...formik.values,
                roleId: 1
            })
        }
    }, [formik.values.role])

    return (
        <>
            <div className="modal usermodal">
                <FontAwesomeIcon icon={faClose} size='2x' onClick={() => setModal(false)} />
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type='text'
                        value={formik.values.name}
                        id='name'
                        onChange={formik.handleChange}
                        required
                    />
                    <label htmlFor="surname">Surname</label>
                    <input
                        type='text'
                        value={formik.values.surname}
                        id='surname'
                        onChange={formik.handleChange}
                        required
                    />
                    <label htmlFor="mail">Email</label>
                    <input
                        type='email'
                        value={formik.values.mail}
                        id='mail'
                        onChange={formik.handleChange}
                        required
                    />
                    <label htmlFor="officeNumber">Office Number</label>
                    <input
                        type='text'
                        value={formik.values.officeNumber}
                        id='officeNumber'
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="personalNumber">Personal Number</label>
                    <input
                        type='tel'
                        value={formik.values.personalNumber}
                        id='personalNumber'
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="positionName">Position Name</label>
                    <input
                        type='text'
                        value={formik.values.positionName}
                        id='positionName'
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        id="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        required
                    />

                    <button className="btn-new" type="submit">Change User</button>
                </form>
            </div>
        </>
    )
}

export default EditUser