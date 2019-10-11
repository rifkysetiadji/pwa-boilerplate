import React, { Component } from 'react'
import {Button,Spinner} from 'reactstrap'
import {connect} from 'react-redux'
import useFetch from '../../services/apiCall';
import {loginSubmit} from '../../redux/actions/auth'
class login extends Component {
    state={
        email:'',
        password:'',
        show:false
    }
    
   
     onChangeEmail=(data)=>{
        var re = /\S+@\S+\.\S+/;
        let result=re.test(data)
        if(result==true){
           this.setState({show:true,email:data})
        }else{
           this.setState({show:false})

        }
    }
     submit=()=>{
        let data={
            email:this.state.email,
            password:this.state.password
        }
        this.props.loginSubmit(data)
    }
    render(){
        return (
            <div>
                <h1 >MYSOCIAL</h1>
                <div className="form">
                <input className="input-login" type="email" onChange={(e)=>this.onChangeEmail(e.target.value)} placeholder="Email"/>
                {this.state.show?<input className="input-login mt-2" type="password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}  placeholder="Password"/>:null}
                <Button className="mt-3" disabled={!this.state.show || this.props.loading.loginLoading==true} onClick={(e)=>this.submit()} color="dark" size="lg" block>{this.props.loading.loginLoading?<Spinner size="sm" color="white" />:'LOGIN'}</Button>
                
                </div>
            </div>
        )
    }
    
}
const mapStateToProps=(state)=>{
    return{
        auth:state.auth,
        loading:state.loading
    }
}
const mapDispatchToProps={
    loginSubmit
}
export default connect(mapStateToProps,mapDispatchToProps)(login)