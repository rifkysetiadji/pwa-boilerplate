import React, { Component } from 'react'
import {Row,Col,Button} from 'reactstrap'
import {connect} from 'react-redux'
import {getProfile,follow,unFollow} from '../../redux/actions/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {debounce} from 'lodash'
class profileDetail extends Component {
    state={
        showEdit:false,
        email:this.props.auth.profile.email,
        name:this.props.auth.profile.name
    }
    toggleEdit=()=>{
        this.setState({
            showEdit:!this.state.showEdit
        })
    }

    followUnFollowEngine=()=>{
        if(this.props.auth.profile.followers!==undefined){
            let isFollow=this.props.auth.profile.followers.includes(this.props.selfId)
            
            if(isFollow){
                return (<a href="#" style={{fontSize:15,cursor:'pointer'}} onClick={this.onUnFollow}>Unfollow</a>)
    
            }else{
                return (<a href="#" style={{fontSize:15,cursor:'pointer'}} onClick={this.onFollow}>Follow</a>)
    
            }
        }
        

    }
    onFollow=()=>{
        this.props.follow(this.props.token.token,this.props.auth.profile.id)
    }
    onUnFollow=()=>{
        this.props.unFollow(this.props.token.token,this.props.auth.profile.id)
    }
    onChange=(e)=>{
        debounce(()=>{
            this.setState({email:e})
        },1000)
    }
    render() {
        let profile=this.props.auth.profile
        return (
            <div>
                <Row>
                <Col md={3} >
                    <img src="/static/img/avadefault.png" style={{width:'100%',borderRadius:5}}/>
                </Col>
                <Col md={9} >
                    <h2>{profile.name}&nbsp;&nbsp;<span>{profile.self?<Button color="dark" onClick={this.toggleEdit}><FontAwesomeIcon icon={faEdit} /></Button>:this.followUnFollowEngine()}</span></h2>
                    <p>{profile.followersCount} pengikut&nbsp;&nbsp;{profile.followingCount} mengikuti&nbsp;&nbsp;{profile.threadsCount} thread</p><br/>
                    {this.state.showEdit==true?
                        <>
                        <div>
                            <label>Nama</label>&nbsp;&nbsp;&nbsp;
                            <input type="text" onChange={(e)=>this.setState({name:e.target.value})} value={this.state.name}/>
                        </div>
                        <div>
                            <label>Email</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="email" onKeyUp={(e)=>console.log(e.target.value)} onChange={(e)=>this.onChange(e.target.value)} value={this.state.email}/>
                        </div>
                        <Button color="dark">UPDATE</Button>
                        </>
                    :null}
                    
                </Col>
                </Row>
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
    getProfile,
    follow,
    unFollow
}
export default connect(mapStateToProps,mapDispatchToProps)(profileDetail)