import React, { Component } from 'react'
import {Card,CardBody,Spinner} from 'reactstrap'
import {connect} from 'react-redux'
import {logoutSubmit,getMyProfile}  from '../../redux/actions/auth'
import {getFollower,getFollowing}  from '../../redux/actions/search'

import FirstVisit from '../../components/firstVisit'
import ModalsFollowers from '../modals/modalFollowers'
import ModalsFollowing from '../modals/modalFollowing'

class profile extends Component {
    state={
        showClub:false,
        showFollowers:false,
        showFollowing:false
    }
    componentDidMount(){
        this.props.getMyProfile(this.props.token.token)
    }
    editClub=()=>{
        this.setState({showClub:!this.state.showClub})

    }
    showFollowers=async()=>{
        this.props.getFollower(this.props.token.token,this.props.auth.profile.id)
        this.setState({showFollowers:!this.state.showFollowers})
        
    }
    showFollowing=()=>{
        this.props.getFollowing(this.props.token.token,this.props.auth.profile.id)
        this.setState({showFollowing:!this.state.showFollowing})
    }
    render() {
        if(this.props.loading.getMyProfileLoading ==true){
            
            return (
                <div>
                    <Card>
                        <CardBody>
                            <Spinner color="white" />
                        </CardBody>
                    </Card>
                </div>
            )
        }else{
            let profile=this.props.auth.profile
            // console.log('profile', profile)
            return (
                <div>
                    
                    <Card>
                        <CardBody>
                            <a style={{color:'black'}} href={`/profile?${this.props.auth.profile.id}`}><h2>{this.props.auth.profile.name}</h2></a>
                            Thread : <a href={`/profile?${this.props.auth.profile.id}`} style={{color:'black'}}>{this.props.auth.profile.threadsCount}</a><br/>
                            Follower: <a href="#" onClick={this.showFollowers} style={{color:'black'}}>{this.props.auth.profile.followersCount}</a><br/>
                            Following: <a href="#" onClick={this.showFollowing} style={{color:'black'}}>{this.props.auth.profile.followingCount}</a><br/>
                            Penggemar <a href="#" onClick={this.editClub}>edit</a>: {profile.clubs!==undefined && profile.clubs.length>0?profile.clubs.map(club=>(
                                <li key={club.id}>{club.name}</li>
                            )):null}
                            <a href="#" onClick={this.props.logoutSubmit}>logout</a>
                        </CardBody>
                    </Card>
                    {this.state.showClub?<FirstVisit/>:null}
                    {this.state.showFollowers?<ModalsFollowers  isOpen={this.state.showFollowers} toggle={this.showFollowers} />:null}
                    {this.state.showFollowing?<ModalsFollowing   isOpen={this.state.showFollowing} toggle={this.showFollowing}/>:null}
                    {profile.clubs!==undefined && profile.clubs.length>0 ?null :<FirstVisit/>}
                </div>
            )
        }
        
    }
}
const mapDispatchToProps={
    logoutSubmit,
    getMyProfile,
    getFollower,
    getFollowing
}
const mapStateToProps=(state)=>{
    return{
        auth:state.auth,
        loading:state.loading
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(profile)
