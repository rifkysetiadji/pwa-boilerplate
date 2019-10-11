import {setLoading} from './loading'
import * as constant from '../constant/search'
import {apiCall} from '../../services/apiCall'
import {get} from 'lodash'

export const searchUser=(keyword,token)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'searchLoading'))
        let dataReq={
            url:`/auth/user/${keyword}`,
            method:'GET',
            data:{
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res,'status')==200){
            dispatch({
                type:constant.SEARCH,
                payload:res.data.user
            })
            dispatch(setLoading(false,'searchLoading'))
        }else{
            alert('ooppss,found trouble here')
            dispatch(setLoading(false,'searchLoading'))
        }
    }
}

export const getFollower=(token)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'getFollowersLoading'))
        let dataReq={
            url:`/auth/followers`,
            method:'GET',
            data:{
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res,'status')==200){
            dispatch(setLoading(false,'getFollowersLoading'))
            dispatch({
                type:constant.SEARCH,
                payload:res.data.user
            })
        }else{
            alert('oopss,found touble here')
            dispatch(setLoading(false,'getFollowersLoading'))
        }
    }
}
export const getFollowing=(token)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'getFollowingLoading'))
        let dataReq={
            url:`/auth/following`,
            method:'GET',
            data:{
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res,'status')==200){
            dispatch(setLoading(false,'getFollowingLoading'))
            dispatch({
                type:constant.SEARCH,
                payload:res.data.user
            })
        }else{
            alert('oopss,found touble here')
            dispatch(setLoading(false,'getFollowingLoading'))
        }
    }
}