import { createSlice } from '@reduxjs/toolkit'
import { addToast } from './toastSlice';
import axios from 'axios';

const initialState = {
    List:{
        page:1,
        totalPages:0,
        data:[]
    },
    modalIns:{
        form:null,
        open:false,
        update:false,
    },
    select:{
        values:[],
    },
}

export const modalSlice = createSlice({
    name: 'Role',
    initialState,
    reducers: {
        updModalRole:(state,{payload})=>{
            const {key,value}=payload
            Object.assign(state.modalIns, {[key]: value,})
        },
        updRoleList:(state,{payload})=>{
            const {key,value}=payload
            Object.assign(state.List, {[key]: value,})
        },
        updRoleSelect:(state,{payload})=>{
            const {key,value}=payload
            Object.assign(state.select, {[key]: value,})
        },
    },
})

export const { 
    updModalRole,
    updRoleList,
    updRoleSelect
} = modalSlice.actions
  
export default modalSlice.reducer

export const fetchAddRole=(form,List)=>async (dispatch)=>{
    const {update}=form;
    axios.post(`${process.env.API_URL}role`, form).then(({data})=> {
        const {ok,msg}=data;
        if(!update){
            ok&&dispatch(updRoleList({key:'data',value:[msg].concat(List)}))
            ok&&dispatch(addToast({message:`El rol se guardo correctamente.`,state:true}))
        }else{
            ok&&dispatch(updRoleList({key:'data',value:List.map((item)=>{
                if(item._id===msg._id) return msg;
                return item;
            })}))
            ok&&dispatch(addToast({message:`El rol se actualizo correctamente.`,state:true}))
        }
        ok&&dispatch(updModalRole({key:'open',value:false}))
    }).catch((e) => { 
        update?
        dispatch(addToast({message:"Ocurrio un error al ACTUALIZAR.",state:false})):
        dispatch(addToast({message:"Ocurrio un error al GUARDAR.",state:false}));
    });
}

export const fetchListRole=(page)=>(dispatch)=>{
    axios.get(`${process.env.API_URL}role/page/${page}`,{}).then(({data})=>{
      const {ok,msg,totalPages}=data
      ok&&dispatch(updRoleList({key:'data',value:msg}))
      ok&&dispatch(updRoleList({key:'totalPages',value:totalPages}))
    }).catch((e)=>{
      dispatch(addToast({message:"Ocurrio un error al listar los roles.",state:false}))
    });
}

export const fetchDeleteRole=(_id,List)=>(dispatch)=>{
    axios.delete(`${process.env.API_URL}role`,{data:{_id}}).then(({data})=>{
        const {ok,msg}=data
        ok&&dispatch(updRoleList({key:'data',value:List.filter((item)=>item._id!=msg._id)}))
        ok&&dispatch(addToast({message:`El rol se elimino correctamente.`,state:true}))
    }).catch(err=>{
        dispatch(addToast({message:"Ocurrio un error al eliminar el rol.",state:false}))
    });
}

export const fetchSelectRole=()=>(dispatch)=>{
    axios.get(`${process.env.API_URL}role/select`,{}).then(({data})=>{
      const {ok,msg}=data
      ok&&dispatch(updRoleSelect({key:'values',value:msg}))
    }).catch((e)=>{
      dispatch(addToast({message:"Ocurrio un error al listar los roles.",state:false}))
    });
}
