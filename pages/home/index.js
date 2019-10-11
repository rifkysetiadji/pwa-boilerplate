import React, { Component } from 'react'
import Header from '../../components/navbar/nav';

import Thread from '../../components/thread'
import RightSide from '../../components/rightSide'
import Leftside from '../../components/leftSide'
import Cookie from 'universal-cookie'
const cookies=new Cookie()
import {Row,Col} from 'reactstrap'
import {connect} from 'react-redux'
import {getProfile} from '../../redux/actions/auth'
import Router from 'next/router';
const token= cookies.get('tokenCookie')

class index extends Component {
    state={
        token:null
    }
    componentDidMount(){
        if(token==undefined){
          Router.push({
            pathname: "/auth",
            query: { act: 'login' }
          })
        }else{
            this.setState({token:token.token})
        }
      }
    render() {
        
        return (
            <div>
                <Header title=""/>
                <br/><br/><br/>
                <div className="container mt-3">
                
                <Row >
                    <Col md={3} >
                        <Leftside token={token}/>
                    </Col>
                    <Col md={5} >
                        <Thread/>
                    </Col>
                    <Col md={4} >
                        <RightSide token={token}/>
                    </Col>
                </Row>
                </div>
                {/* <FirstVisit/> */}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        auth:state.auth
    }
}
const mapDispatchToProps={
    getProfile
}
export default connect(mapStateToProps,mapDispatchToProps)(index)