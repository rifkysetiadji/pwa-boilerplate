import React, { Component } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import './style.css'
import {Button,Row,Col,Spinner} from 'reactstrap'
import {debounce} from 'lodash'
import {connect} from 'react-redux'
import {searchUser} from '../../redux/actions/search'
import Cookie from 'universal-cookie'
const cookies=new Cookie()
const token=cookies.get('tokenCookie')
class nav extends Component {
  state={
    showResult:false,
    keyword:''
  }
  renderResultSearch=()=>{
    return(
      <div  style={{width:300,marginTop:-5,position:'absolute',zIndex:1,backgroundColor:'white'}}>
        {this.props.loading.searchLoading?<Spinner color="dark" />
        :this.props.search.result.map(user=>(
          <div key={user._id}><Row className="container mt-2">
        <Col md={3} ><img src="/static/img/avadefault.png" style={{width:30,borderRadius:50}}/></Col>
        <Col md={9} style={{color:'black',textAlign:'left',cursor:'pointer'}}><a href={`/profile?${user._id}`} style={{color:'black'}}>{user.name}</a></Col>
      </Row></div>
        ))}
        
       
      </div>
    )
  }
  
  onChange=(e)=>{
    this.setState({keyword:e})
    if(e!==''){
    this.props.searchUser(e,token.token)

    }
  } 
  render() {
   
    
    return (
      <div className="parent "  >
        <div className="parent-row" >
        <Row >
          {/* <Col md={2} xs={2}> */}
          <a href="/home"><img src="/static/icon/tai.png" style={{width:70}}/></a>
          {/* <h2>MYsocial</h2> */}
          {/* </Col> */}
          <Col>
            <ul className="nav-link">
              {/* <li>
                <h2>MY</h2>
              </li> */}
              
              <li>
              <input className={this.state.keyword!==''?'search-active':'search'} onChange={(e)=>this.onChange(e.target.value)} placeholder="social football..."/>
               {this.props.search.result!==null && this.state.keyword!==''?this.renderResultSearch():null}
              </li>
              <li className="mt-2">
              <h6><a href={`/auth?act=${this.props.link}`} style={{color:'white'}}>{this.props.link}</a></h6>
              </li>
            </ul>
          </Col>
         </Row>
        </div>
         
      </div>
     
    )
  }
}
const mapStateToProps=(state)=>{
  return{
    search:state.search,
    loading:state.loading
  }
}
const mapDispatchToProps={
  searchUser
}
export default connect(mapStateToProps,mapDispatchToProps)(nav)

