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
    ListEncargados:{
      List:[],
      open:false,
    },
    Tactico:{
      form:null,
      open:false,
      update:false
    },  
    ListTactico:{
      List:[],
      open:false,
      sipcop:null
    },
    Incidencia:{
      form:null,
      open:false,
      update:false,
      selects:{
        Ocurrencia:[],
        TipoZona:[],
        TipoVia:[]
      }
    },
    ListIncidencia:{
      List:[],
      open:false,
      sipcop:null
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
      udpModalListEncargado:(state,{payload})=>{
        const {key,value}=payload
        Object.assign(state.ListEncargados, {[key]: value,})
      },
      udpModalTactico:(state,{payload})=>{
        const {key,value}=payload
        Object.assign(state.Tactico, {[key]: value,})
      },
      udpModalListTactico:(state,{payload})=>{
        const {key,value}=payload
        Object.assign(state.ListTactico, {[key]: value,})
      },
      udpModalIncidencia:(state,{payload})=>{
        const {key,value}=payload
        Object.assign(state.Incidencia, {[key]: value,})
      },
      IncidenciaSelects:(state,{payload})=>{
        const {key,value}=payload
        Object.assign(state.Incidencia.selects, {[key]: value,})
      },
      udpModalListIncidencia:(state,{payload})=>{
        const {key,value}=payload
        Object.assign(state.ListIncidencia, {[key]: value,})
      },
    },
  })
  
  export const { 
    updModalKm ,
    updOneModalKm,
    updModalSipCop,
    udpModalOdometro,
    udpModalEncargado,
    udpModalListEncargado,
    udpModalTactico,
    udpModalListTactico,
    udpModalIncidencia,
    IncidenciaSelects,
    udpModalListIncidencia
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

  export const fetchUpdEncargado=(form,List)=>(dispatch)=>{
    const {update}=form
    axios.put(`${process.env.API_URL}sipcop/updates/encargados`,form).then(({data})=> {
        const {msg,ok}=data;
        if(update){
          ok&&dispatch(addToast({message:`Se ACTUALIZO correctamente el rol.`,state:true}))
        }else{
          ok&&dispatch(updSipcopList(List.map((item)=>{
            if(item._id===msg._id) return msg;
            return item;
          })));
          ok&&dispatch(addToast({message:`Se agrego a ${form.Nombres} como responsable.`,state:true}))
        }
        ok&&dispatch(udpModalEncargado({key:'open',value:false}))
    }).catch((e) => {
      if(update){
        dispatch(addToast({message:"Ocurrio un error al Actualizar a responsable.",state:false}))
      }else{
        dispatch(addToast({message:"Ocurrio un error al agregar a responsable.",state:false}))
      }
    });
  }

  export const fetchFindResposables=(Responsables)=>(dispatch)=>{
    axios.get(`${process.env.API_URL}sipcop/encargados`,{params:{Responsables}}).then(({data})=> {
      const {msg,ok}=data;
      ok&&dispatch(udpModalListEncargado({key:'List',value:msg}))
    }).catch(_ => {
      dispatch(addToast({message:"Ocurrio un error al BUSCAR.",state:false}))
    });
  }

  export const fetchFindDireccion=(form)=>(dispatch)=>{
    const coordenadasRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    if(form&&form.Posicion&&coordenadasRegex.test(form.Posicion)){
      const ubicacion={Latitud:Number(form.Posicion.split(',')[0]),Longitud:Number(form.Posicion.split(',')[1])};
      axios.get(`${process.env.API_URL}sipcop/tacticalpoints/direccion`,{params:ubicacion}).then(({data})=>{
          const {ok,msg:{Direccion}}=data
          ok&&dispatch(udpModalTactico({key:"form",value:{...form,Direccion}}))
      }).catch((e)=>{
          dispatch(addToast({message:"Ocurrio un error al BUSCAR la direccion.",state:false}))
      });
    }else{
      dispatch(addToast({message:"La Posicion ingresada no es correcta.",state:false}))
    }
  }

  export const fetchAddUpdTactico=(form,update,List)=>(dispatch)=>{
    if(!update){
        axios.post(`${process.env.API_URL}sipcop/updates/tactico`, form).then(({data})=> {
          const {msg,ok}=data;
          ok&&dispatch(updSipcopList(List.map((item)=>{
            if(item._id===msg._id) return msg;
            return item;
          })));
          ok&&dispatch(addToast({message:`Se INSERTO correctamente el punto  tactico de ${form.Direccion}.`,state:true}))
          ok&&dispatch(udpModalTactico({key:"open",value:false}))
        }).catch(_ => {
          dispatch(addToast({message:"Ocurrio un error al INSERTAR el punto tactico.",state:false}))
        });
    }else{
      axios.put(`${process.env.API_URL}sipcop/updates/tactico`, form).then(({data})=> {
        const {msg,ok}=data
        ok&&dispatch(udpModalTactico({key:"open",value:false}))
        ok&&dispatch(addToast({message:`Se ACTUALIZO correctamente el punto  tactico de ${msg.Direccion}.`,state:true}))
      }).catch(_ => {
        dispatch(addToast({message:"Ocurrio un error al Actualizar el punto tactico.",state:false}))
      });
    }
  }

  export const fetchFindTactico=(Tactico)=>(dispatch)=>{
    axios.get(`${process.env.API_URL}sipcop/updates/tactico`,{params:{Tactico}}).then(({data})=> {
      const {msg,ok}=data;
      ok&&dispatch(udpModalListTactico({key:'List',value:msg}))
    }).catch(_ => {
      dispatch(addToast({message:"Ocurrio un error al BUSCAR.",state:false}))
    });
  }

  export const fetchUpdTacticoCompleto=(update,List)=>(dispatch)=>{
    axios.put(`${process.env.API_URL}sipcop/tacticalpoints/activo`, update).then(({data})=> {
      const {ok,msg}=data;
      ok&&dispatch(udpModalListTactico({key:"List",value:List.map((item)=>{
        if(item._id===msg._id) return msg;
        return item;
      })}))
      ok&&dispatch(addToast({message:`Se ACTUALIZO correctamente el punto  tactico de ${msg.Direccion}.`,state:true}))
    }).catch(_ => {
      dispatch(addToast({message:"Ocurrio un error al ACTUALIZAR.",state:false}))
    });
  }
  // Incidencia

  export const fetchIncidencia=(form,List)=>(dispatch)=>{
    const coordenadasRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    const {Ubicacion,update}=form
    console.log(Ubicacion)
    if(Ubicacion&&coordenadasRegex.test(Ubicacion)){
      form={
        ...form,
        Coordenadas:{
          Latitud:Ubicacion.split(',')[0],
          Longitud:Ubicacion.split(',')[1],
        }
      }
    }else{
      form={
        ...form,
        Coordenadas:{}
      }
    }
    axios.post(`${process.env.API_URL}sipcop/incidencia`, form).then(({data})=> {
      const {msg,ok}=data;
      ok&&(update===false)&&dispatch(updSipcopList(List.map((item)=>{
        if(item._id===msg._id) return msg;
        return item;
      })));
      ok&&(update===false)&&dispatch(addToast({message:`Se INSERTO correctamente la incidencia.`,state:true}))
      ok&&dispatch(udpModalIncidencia({key:"open",value:false}))
    }).catch(_ => {
      dispatch(addToast({message:"Ocurrio un error al INSERTAR la incidencia.",state:false}))
    });
  }

  export const fetchFindIncidencias=(filter)=>(dispatch)=>{
    axios.get(`${process.env.API_URL}sipcop/incidencia`,{params:{filter}}).then(({data})=> {
      const {msg,ok}=data;
      ok&&dispatch(udpModalListIncidencia({key:'List',value:msg}))
    }).catch(_ => {
      dispatch(addToast({message:"Ocurrio un error al Listar las incidencias.",state:false}))
    });
  }

  export const fetchFindIncSelects=(findOpt)=>(dispatch)=>{
    const {option}=findOpt
    axios.get(`${process.env.API_URL}sipcop/incidencia/selects`,{params:findOpt}).then(({data})=> {
      const {msg,ok}=data;
      ok&&(option==='Ocurrencia')&&dispatch(IncidenciaSelects({key:'Ocurrencia',value:msg}))
      ok&&(option==='TipoZona')&&dispatch(IncidenciaSelects({key:'TipoZona',value:msg}))
      ok&&(option==='TipoVia')&&dispatch(IncidenciaSelects({key:'TipoVia',value:msg}))
    }).catch((e) => {
      if(option==='Ocurrencia') dispatch(addToast({message:"Ocurrio un error al LISTAR las ocurrencias.",state:false}));
      if(option==='TipoZona') dispatch(addToast({message:"Ocurrio un error al LISTAR rl tipo de zona.",state:false}));
      if(option==='TipoVia') dispatch(addToast({message:"Ocurrio un error al LISTAR el tipo de via.",state:false}));
    });
  }
  