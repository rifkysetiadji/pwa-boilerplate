import * as constant from '../constant/auth'
import Auth from '../reducers/auth'
import {apiCall} from '../../services/apiCall'
import axios from 'axios'
import baseUrl from '../../services/baseUrl'
import {get} from 'lodash'
import Cookie from 'universal-cookie'
import {setLoading} from './loading'
const nextYear = new Date();
const current = new Date();
nextYear.setFullYear(current.getFullYear() + 1);
const cookies= new Cookie()
// export const setLoading=(bool,loadingFor)=>{
//     return{
//         type:constant.LOADING,
//         payload:bool,
//         loadingFor:loadingFor
//     }
// }
export function setCookies(data, title) {
    return dispatch => {
      let prefix = title + "="
      let check = document.cookie.indexOf(prefix);
      if (check == -1) {
        cookies.set(title, data, { path: '/', expires: nextYear });
      } else {
        dispatch(removeCookies(title))
        cookies.set(title, data, { path: '/', expires: nextYear });
  
      }
  
  
    };
  }
export function removeCookies(title) {
    return () => {
      cookies.remove(title, { path: '/', expires: nextYear });
    };
  }
export const loginSubmit=(data)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'loginLoading'))
        const dataReq={
            url:'/auth/login',
            method:'POST',
            data:{data}
        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res, 'status') === 200){
            console.log(res.data.token)
            dispatch(setCookies(res.data,'tokenCookie'))
            window.location.assign('/home')
        }else{
            dispatch(setLoading(false,'loginLoading'))

            alert('terjadi kesalahan')
        }
        
        
    }
}
export const registerSubmit=(data)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'registerLoading'))
        const dataReq={
            url:'/auth/register',
            method:'POST',
            data:{data}
        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res, 'status') === 200){
            // dispatch(setCookies(res.data,'tokenCookie'))
            window.location.assign('/auth?act=login')
        }else{
            dispatch(setLoading(false,'registerLoading'))

            alert('terjadi kesalahan')
        }
    }
}
export const getMyProfile=(token)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'getMyProfileLoading'))
        const dataReq={
            url:`/auth/home/profile/`,
            method:'GET',
            data:{
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
        const res=await dispatch(apiCall(dataReq))
        if(get(res, 'status') === 200){
            console.log(res.data)
            let dataUser={
                id:res.data.user._id,
                name:res.data.user.name,
                email:res.data.user.email,
                threadsCount:res.data.user.threads.length,
                followersCount:res.data.user.followers.length,
                followingCount:res.data.user.following.length,
                clubs:res.data.user.club_favorit,
                // self:res.data.user.self
            }
            dispatch({
                type:constant.GET_PROFILE,
                payload:dataUser
            })
            dispatch(setCookies(res.data.user._id,'userId'))
            dispatch(setLoading(false,'getMyProfileLoading'))

        }else{
            dispatch(setLoading(false,'getMyProfileLoading'))
            // console.log(res)
            // alert('error')
            return res
        }
    }
}
export const getProfile=(token,id)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'getProfileLoading'))
        const dataReq={
            url:`/auth/profile/${id}`,
            method:'GET',
            data:{
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res, 'status') === 200){
            console.log('res.data', res.data)
            let dataUser={
                id:res.data.user._id,
                avatar_url:res.data.user.avatar_url,
                name:res.data.user.name,
                email:res.data.user.email,
                threadsCount:res.data.user.threads.length,
                followers:res.data.user.followers,
                following:res.data.user.following,
                followersCount:res.data.user.followers.length,
                followingCount:res.data.user.following.length,
                clubs:res.data.user.club_favorit,
                self:res.data.self
            }
            dispatch({
                type:constant.GET_PROFILE,
                payload:dataUser
            })
            
            dispatch(setLoading(false,'getProfileLoading'))

        }else{
            dispatch(setLoading(false,'getProfileLoading'))
            console.log(res)
        }
    }
}
export const logoutSubmit=()=>{
    return async(dispatch)=>{
        dispatch(removeCookies('tokenCookie'))
        window.location.assign('/')
    }
   
}
export const addClub=(data,token)=>{
    return async(dispatch)=>{
        // dispatch(setLoading(true))
        let dataReq={
            url:'/auth/club-add',
            method:'PUT',
            data:{
                data,
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res,'status')==200){
            window.location.reload()
        }
        
    }
}


export const follow=(token,followingId)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'followLoading'))
        let dataReq={
            url:`/auth/follow/${followingId}`,
            method:'POST',
            data:{
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res,'status')==200){
            window.location.reload()
        }else{
            alert('oopss,found touble here')
            dispatch(setLoading(false,'followLoading'))
        }
    }
}

export const unFollow=(token,followingId)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true,'unFollowLoading'))
        let dataReq={
            url:`/auth/unfollow/${followingId}`,
            method:'POST',
            data:{
                headers:{
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
        let res=await dispatch(apiCall(dataReq))
        if(get(res,'status')==200){
            window.location.reload()
        }else{
            alert('oopss,found touble here')
            dispatch(setLoading(false,'unFollowLoading'))
        }
    }
}

