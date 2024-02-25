import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import moment from "moment-timezone";
import { addToast } from './toastSlice';

const initialState = {
  ListSipCops:[],
  ListIncidencias:[],
  ListTacticos:[],
  ListResponsables:[],
  value: 0,
  selects:{
    
  }
}

export const sipcopSlice = createSlice({
  name: 'SipCop',
  initialState,
  reducers: {
    updSipcopList:(state, {payload})=>{
      state.ListSipCops=payload;
    },
    updOneSipcopList:(state, {payload})=>{
      console.log(payload)
      state.SipCops.ListSipCops=state.SipCops.ListSipCops.map((item)=>{
        console.log(item)
        if(item._id===payload._id) return payload;
        return item;
      });
    },
  },
})

export const { 
  updSipcopList,
  updOneSipcopList
} = sipcopSlice.actions

export default sipcopSlice.reducer

export const fetchFindSipCop=(Fechai,Fechaf,idTurno)=>async (dispatch)=>{
  const params={
    Fechai,
    Fechaf,
    idTurno
  }
  console.log(params)
  axios.get(`${process.env.API_URL}/sipcop/getday`,{params}).then(({data})=>{
    console.log(data)
    if(data.ok) dispatch(updSipcopList(data.msg));
  }).catch(()=>{
    dispatch(addToast({message:"Ocurrio un error al listar.",state:false}))
  });
}

export const fetchAddSipCop=(add,turno)=>async ()=>{
  if(add.length>0){
      axios.post(`${process.env.API_URL}sipcop/inserts/complete`, {add,turno}).then(data=> {
          console.log(data)
          //setOpenModal({...openModal,open:false});
          //fetchData();
          //alert("actualizado")
      }).catch((e) => { 
          dispatch(addToast({message:"Ocurrio un error al GUARDAR.",state:false}))
      });
  }else{
    dispatch(addToast({message:"No selecciono ningun elemento.",state:false}))
  }
}