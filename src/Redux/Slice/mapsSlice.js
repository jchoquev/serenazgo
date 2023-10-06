import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
import { uuid } from 'uuidv4';

const initialState = {
    ModalPoints:{
        List:[],
        open:false,
        sipcop:null,
        title:""
    },
}

export const MapSlice = createSlice({
    name: 'Maps',
    initialState,
    reducers: {
        updModalPoints:(state, {payload})=>{
            const {key,value}=payload
            Object.assign(state.ModalPoints, {[key]: value,})
        },
    },
  })
  
  export const { 
    updModalPoints
  } = MapSlice.actions
  
  export default MapSlice.reducer