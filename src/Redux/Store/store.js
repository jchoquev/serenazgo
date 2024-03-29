import { configureStore } from '@reduxjs/toolkit'
import SipCopReducer from '../Slice/sipcopSlice'
import modalReducer from '../Slice/modalSlice'
import toastReducer from "../Slice/toastSlice"
import roleReducer from "../Slice/roleSlice"
import mapsSlice from '../Slice/mapsSlice'
import listSlice from '../Slice/listSlice'
export const store = configureStore({
  reducer: {
    SipCop:SipCopReducer,
    Modal:modalReducer,
    Toast:toastReducer,
    Role:roleReducer,
    Maps:mapsSlice,
    Lists:listSlice,
  },
})