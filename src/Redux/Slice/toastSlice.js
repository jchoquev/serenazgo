import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
import { uuid } from 'uuidv4';

const initialState = {
    List:[],
}

export const toastSlice = createSlice({
    name: 'Toast',
    initialState,
    reducers: {
      addToast:(state, {payload})=>{
        state.List.push({...payload,key:uuid(),hora:moment().format('LTS')});
      },
      delToast:(state, {payload})=>{
        const key=payload
        state.List=state.List.filter((item)=>item.key!=key)
      },
    },
  })
  
  export const { 
    addToast,
    delToast
  } = toastSlice.actions
  
  export default toastSlice.reducer