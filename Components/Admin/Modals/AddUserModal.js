import React from "react";
import { useFormik } from "formik";
import '../Admin.css'

function AddModalUser() {

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            mail: '',
            officeNumber: '',
            personalNumber: '',
            positionName: '',
            roleId: ''
        },
        onSubmit: async values => {
            console.log(values)
        }
    })

    return (
        <>
            <div className="modal usermodal" >
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type='text'
                        value={formik.values.name}
                        id='name'
                    />
                    <label htmlFor="surname">Surname</label>
                    <input
                        type='text'
                        value={formik.values.surname}
                        id='surname'
                    />
                    <label htmlFor="mail">Email</label>
                    <input
                        type='mail'
                        value={formik.values.mail}
                        id='mail'
                    />
                    <label htmlFor="officeNumber">Office Number</label>
                    <input
                        type='text'
                        value={formik.values.officeNumber}
                        id='officeNumber'
                    />
                    <label htmlFor="personalNumber">Personal Number</label>
                    <input
                        type='tel'
                        value={formik.values.personalNumber}
                        id='personalNumber'
                    />
                    <label htmlFor="positionName">Position Name</label>
                    <input
                        type='text'
                        value={formik.values.positionName}
                        id='positionName'
                    />
                    <label htmlFor="roleId">Role</label>
                    <input
                        type='number'
                        value={formik.values.roleId}
                    />
                </form>
            </div>
        </>
    )
}

export default AddModalUser