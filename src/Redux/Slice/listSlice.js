import { createSlice } from '@reduxjs/toolkit'
import { addToast } from './toastSlice'
import axios from 'axios'

const initialState = {
    TacticalPoints:[],
    Asistencia:[],
}
  
export const listSlice = createSlice({
  name: 'List',
  initialState,
  reducers: {
    updListTacticalPoints:(state, {payload})=>{
      const {value}=payload
      state.TacticalPoints=value;
    },
    updListAsistencia:(state, {payload})=>{
      const {value}=payload
      state.Asistencia=value;
    },
  },
})
    
export const { 
    updListTacticalPoints,
} = listSlice.actions

export const fetchAllTactico=()=>(dispatch)=>{
    axios.get(`${process.env.API_URL}tactical/page/all`).then(({data})=> {
      const {msg,ok}=data;
      ok&&dispatch(updListTacticalPoints({key:'List',value:msg}))
    }).catch(_ => {
      dispatch(addToast({message:"Ocurrio un error al BUSCAR puntos tacticos.",state:false}))
    });
}

export const fetchAllAsistencia=()=>(dispatch)=>{
  axios.get(`${process.env.API_URL}tactical/page/all`).then(({data})=> {
    const {msg,ok}=data;
    ok&&dispatch(updListTacticalPoints({key:'List',value:msg}))
  }).catch(_ => {
    dispatch(addToast({message:"Ocurrio un error al BUSCAR puntos tacticos.",state:false}))
  });
}
    
export default listSlice.reducer