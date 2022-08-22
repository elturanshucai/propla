import { createSlice } from "@reduxjs/toolkit"

export const projectSlice = createSlice({
    name: 'propla',
    initialState: {
        login: false
    },
    reducers: {
        fnLogin: (state) => {
            state.login = true
        },
        fnLogout: (state) => {
            state.login = false
        },
        
    }
})

export const { fnLogin, fnLogout } = projectSlice.actions
export default projectSlice.reducer