
import React, { Component } from 'react'
import './style.css'
import {Button} from 'reactstrap'
import Auth from './auth'
import Cookie from 'universal-cookie'
const cookies=new Cookie()
import Router, { useRouter, withRouter } from "next/router";
class index extends Component {
  
  componentDidMount(){
    let token=cookies.get('tokenCookie')
    if(token==undefined){
      Router.push({
        pathname: "/auth",
        query: { act: 'login' }
      })
    }else{
      window.location.assign('/home')
    }
    
  }
  render() {
    
    return (
      <div></div>
      
    )
  }
}
export default withRouter(index)