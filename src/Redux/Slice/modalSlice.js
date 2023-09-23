import { createSlice } from '@reduxjs/toolkit'
import { addToast } from './toastSlice';
import { updSipcopList } from './sipcopSlice';
import axios from 'axios';

const initialState = {
    Km:{
      form:null,
      open:false,    
    },
    listSipCop:{
      data:null,
      open:false,
    },
    Odometro:{
      form:null,
      open:false,
    },
    Encargado:{
      form:null,
      open:false,
      update:false
    },    
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
      updModalSipCop:(state,{payload})=>{
        const {key,value}=payload
        Object.assign(state.listSipCop, {[key]: value,})
      },
      udpModalOdometro:(state,{payload})=>{
        const {key,value}=payload
        Object.assign(state.Odometro, {[key]: value,})
      },
      udpModalEncargado:(state,{payload})=>{
        const {key,value}=payload
        Object.assign(state.Encargado, {[key]: value,})
      },
    },
  })
  
  export const { 
    updModalKm ,
    updOneModalKm,
    updModalSipCop,
    udpModalOdometro,
    udpModalEncargado
  } = modalSlice.actions
  
  export default modalSlice.reducer
  //Km
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
  //listSipCop
  export const insListSipCop=(add,turno,List)=>(dispatch)=>{
    if(add.length>0){
      axios.post(`${process.env.API_URL}sipcop/inserts/complete`, {add,turno}).then(({data})=> {
        const {ok,msg}=data
        ok&&dispatch(updModalSipCop({key:'open',value:false}))
        ok&&dispatch(updSipcopList(List.concat(msg)))
        ok&&dispatch(addToast({message:`Se agrego ${msg.length} elementos.`,state:true}))
      }).catch((e) => { 
        dispatch(addToast({message:"Ocurrio un error al INSERTAR la lista.",state:false}))
      });
    }else{
      dispatch(addToast({message:"No selecciono ningun elemento de la lista.",state:false}))
    }
  }

  export const fetchVhActivo=()=>(dispatch)=>{
    axios.get(`${process.env.API_URL}vehiculos/activo`,{}).then(({data})=>{
      const {ok,msg}=data
      ok&&dispatch(updModalSipCop({key:'data',value:msg}))
    }).catch((e)=>{
      dispatch(addToast({message:"Ocurrio un error al listar los vehiculos activos.",state:false}))
    });
  }

  //Odometro
  export const fetchUpdOdometro=(form,List)=>(dispatch)=>{
    axios.put(`${process.env.API_URL}sipcop/updates/odometro`,form).then(({data})=> {
      const {msg,ok}=data;
      ok&&dispatch(updSipcopList(List.map((item)=>{
        if(item._id===msg._id) return msg;
        return item;
      })));
      ok&&dispatch(udpModalOdometro({key:'open',value:false}))
      ok&&dispatch(addToast({message:`(${msg.TipoVehiculo} ${msg.Numero}) El Odometro se actualizo correctamente.`,state:true}))
    }).catch(_ => {
      dispatch(addToast({message:"Ocurrio un error al ACTUALIZAR.",state:false}))
    });
  }
  //responsables
  export const fetchFindDNI=(form)=>(dispatch)=>{
    axios.get(`${process.env.API_URL}sipcop/getfindstaff`,{params:{NDocumento:form.DNI}}).then(({data})=> {
      const {msg:{_id,fullNombres,NCelular},ok}=data;
      ok&&dispatch(udpModalEncargado({key:"form",value:{...form,_idUser:_id,NCelular,Nombres:fullNombres}}))
    }).catch(_ => {
      dispatch(addToast({message:"Ocurrio un error al BUSCAR.",state:false}))
    });
  }

  export const fetchUpdEncargado=(form)=>(dispatch)=>{
    axios.put(`${process.env.API_URL}sipcop/updates/encargados`,form).then(({data})=> {
        const {msg,ok}=data;
        console.log(msg,ok)
        /*ok&&setData(dataTable.map((item)=>{
            if(item._id===msg._id) return msg;
            return item;
        }));
        ok&&setEncargadoModal({...encargadoModal,open:false})*/
    }).catch((e) => {
        dispatch(addToast({message:"Ocurrio un error al listar los roles.",state:false}))
    });
  }
