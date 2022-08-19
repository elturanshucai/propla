import { configureStore } from "@reduxjs/toolkit"
import projectReducer from './reducers/projectReducer'

const store = configureStore({
    reducer: { projectReducer }
})

export default store