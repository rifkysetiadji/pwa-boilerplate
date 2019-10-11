
import React, { Component } from 'react'
import './style.css'
import Login from '../components/auth/login'
import Register from '../components/auth/register'
import Router, { useRouter, withRouter } from "next/router";
import Header from '../components/navbar/nav';
import Cookie from 'universal-cookie'
const cookies=new Cookie()
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
        <div>
            <Header link={this.props.router.query.act==='login'?'signup':'login'}/>
          <br/><br/><br/>
        <div style={{width:'100%',margin:'0 auto',textAlign:'center',position:'relative',height:750}}>
            <div className="child">
            {this.props.router.query.act==='login'?<Login/>:<Register/>}
            </div>
        </div>
      </div>
    )
  }
}
export default withRouter(index)
