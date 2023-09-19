import { createSlice } from '@reduxjs/toolkit'
import { addToast } from './toastSlice';
import { updSipcopList } from './sipcopSlice';
import axios from 'axios';

const initialState = {
    Km:{
        form:null,
        open:false,    
    }
}

export const modalSlice = createSlice({
    name: 'Modal',
    initialState,
    reducers: {
      updModalKm:(state, {payload})=>{
        state.Km=payload;
      },
      updOneModalKm:(state, {payload})=>{
        const {key,value}=payload
        Object.assign(state.Km, {[key]: value,})
      },
    },
  })
  
  export const { 
    updModalKm ,
    updOneModalKm
  } = modalSlice.actions
  
  export default modalSlice.reducer

  export const updKilometraje=(form,List)=>(dispatch)=>{
    axios.put(`${process.env.API_URL}sipcop/updates/km`,{...form}).then(({data})=> {
      const {msg,ok}=data;
      ok&&dispatch(updSipcopList(List.map((item)=>{
        if(item._id===msg._id) return msg;
        return item;
      })));
      ok&&dispatch(updModalKm(initialState.Km))
      ok&&dispatch(addToast({message:`(${msg.TipoVehiculo} ${msg.Numero}) El kilometraje se actualizo correctamente.`,state:true}))
    }).catch(_ => {
      dispatch(addToast({message:"Ocurrio un error al ACTUALIZAR.",state:false}))
    });
  }