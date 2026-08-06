import { configureStore } from '@reduxjs/toolkit'
import studentsSlice from './slices/studentsSlice.js'
import subjectsSlice from './slices/subjectsSlice.js'

const store = configureStore({
  reducer: {
    students: studentsSlice,
    subjects: subjectsSlice,
  }
})

export default store
