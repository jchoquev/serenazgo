import { configureStore } from '@reduxjs/toolkit'
import SipCopReducer from '../Slice/sipcopSlice'
import modalReducer from '../Slice/modalSlice'
import toastReducer from "../Slice/toastSlice"

export const store = configureStore({
  reducer: {
    SipCop:SipCopReducer,
    Modal:modalReducer,
    Toast:toastReducer
  },
})