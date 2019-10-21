import * as constant from '../constant/thread'
import {apiCall} from '../../services/apiCall'
import {get} from 'lodash'
import {setLoading} from './loading'
// export const setLoading=(bool)=>{
//     return{
//         type:constant.LOADING,
//         payload:bool
//     }
// }
export const getThreads=(token,id)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'getThreads'))
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
            dispatch(setLoading(false,'getThreads'))

        }else{
            dispatch(setLoading(false,'getThreads'))
            alert('gagal get')
        }
    }
}
export const addThread=(token,data)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'addThread'))
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
            dispatch(setLoading(false,'addThread'))
            alert('adaw error tuh')
        }
    }
}

export const getTimeline=(token)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'getTimeline'))
        let dataReq={
            url:`/thread/timeline`,
            method:'GET',
            data:{
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
        console.log(token)
        let res=await dispatch(apiCall(dataReq))
        if(get(res, 'status') === 200){
            // dispatch(setCookies(res.data,'tokenCookie'))
            dispatch({
                type:constant.GET_TIMELINE,
                payload:res.data
            })
            dispatch(setLoading(false,'getTimeline'))

        }else{
            dispatch(setLoading(false,'getTimeline'))

            alert('gagal get')
        }
    }
}