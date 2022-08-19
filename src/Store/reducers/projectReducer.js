import { createSlice } from "@reduxjs/toolkit"

export const projectSlice = createSlice({
    name: 'propla',
    initialState: {
        projectList: [],
        searchedList: []
    },
    reducers: {
        setProjectList: (state, {payload})=>{
            state.projectList=[payload]
        },
        setSearchedList: (state, {payload})=>{
            state.searchedList=state.projectList.filter(item=>item.projectName.includes(payload))
        }
    }
})

export default projectSlice.reducer