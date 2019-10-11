import * as constant from '../constant/thread'
import {apiCall} from '../../services/apiCall'
import {get} from 'lodash'

export const setLoading=(bool)=>{
    return{
        type:constant.LOADING,
        payload:bool
    }
}
export const getThreads=(token,id)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        let dataReq={
            url:`/thread/get-thread/${id}`,
            method:'GET',
            data:{
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res, 'status') === 200){
            // dispatch(setCookies(res.data,'tokenCookie'))
            dispatch({
                type:constant.GET_THREADS,
                payload:res.data
            })
            dispatch(setLoading(false))

        }else{
            dispatch(setLoading(false))
            alert('gagal get')
        }
    }
}
export const addThread=(token,data)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        let dataReq={
            url:'/thread/add',
            method:'POST',
            data:{
                data,
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }

        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res,'status')===201){
            window.location.reload()
        }else{
            dispatch(setLoading(false))
            alert('adaw error tuh')
        }
    }
}