import React, { Component } from 'react'
import {Button,Spinner} from 'reactstrap'
import {connect} from 'react-redux'
import useFetch from '../../services/apiCall';
import {registerSubmit} from '../../redux/actions/auth'
class login extends Component {
    state={
        name:'',
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
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }
        this.props.registerSubmit(data)
    }
    render(){
        return (
            <div>
                <h1 >MYSOCIAL</h1>
                <div className="form">
                <input className="input-login" type="text" onChange={(e)=>this.setState({name:e.target.value})} placeholder="Nama"/>
                
                <input className="input-login mt-2" type="email" onChange={(e)=>this.onChangeEmail(e.target.value)} placeholder="Email"/>
                {this.state.show?<input className="input-login mt-2" type="password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}  placeholder="Password"/>:null}
                <Button className="mt-3" disabled={!this.state.show || this.props.loading.registerLoading==true} onClick={(e)=>this.submit()} color="dark" size="lg" block>{this.props.loading.registerLoading?<Spinner size="sm" color="white" />:'REGISTER'}</Button>
                
                </div>
            </div>
        )
    }
    
}
const mapStateToProps=(state)=>{
    return{
        auth:state.auth,
        loading:state.auth
    }
}
const mapDispatchToProps={
    registerSubmit
}
export default connect(mapStateToProps,mapDispatchToProps)(login)