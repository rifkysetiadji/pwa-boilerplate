import axios from "axios";
// import { setErrorMessage } from "../redux/actions/alertAction";
import { get } from "lodash";
import baseUrl from './baseUrl'
import {isEmpty} from 'lodash'
import Cookies from 'universal-cookie'
import {logoutSubmit} from '../redux/actions/auth'
let contentType = {"Content-Type" : "application/json"}
const defaultHeader=(val)=>{
	if( val['Content-Type'] !== undefined){
		return val
 }else{
	 return {...val,...contentType}
 }
}

export const apiCall = ({ method, url, data = "" }) => async (dispatch) => {
	let head = !isEmpty(data.headers) ? defaultHeader(data.headers) :contentType
	try {
		const response = await axios({
			method: method,
			url: '/api' + url,
			data: data.data || "",
			headers: { ...head} || "",
			params: data.params || "",
			timeout: data.timeout || 0,
		});
		// console.log('from apical',head)
		return response;
	} catch (error) {

		if(get(error.response,'status')==401){
			await dispatch(logoutSubmit())
		}else if(get(error.response,'status')==404){
			//  alert('404')
			window.location.assign('/404')
		}
		

	}
};
