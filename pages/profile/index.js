import React, { Component } from 'react'
import Header from '../../components/navbar/nav';
import {Row,Col,Spinner} from 'reactstrap'
import ProfileDetail from '../../components/detailProfile/profileDetail'
import ProfileThread from '../../components/detailProfile/profileThread'
import {connect} from 'react-redux'
import {getProfile} from '../../redux/actions/auth'
import {getThreads} from '../../redux/actions/thread'
import Cookie from 'universal-cookie'
const cookies=new Cookie()
const token= cookies.get('tokenCookie')
const selfId=cookies.get('userId')
class index extends Component {
    componentDidMount(){
        let id =window.location.search.substring(1,window.location.search.length)
        this.props.getProfile(token.token,id)
        this.props.getThreads(token.token,id)
    }
    render() {

        return (
            <div>
                <Header/>
                <br/><br/><br/>
                <div className="container mt-3">
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }} >
                            {this.props.loading.getProfileLoading==true?<Spinner color="black" />:<ProfileDetail selfId={selfId} token={token}/>}
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }} >
                        {this.props.loading.getProfileLoading==true?<Spinner color="black" />:<ProfileThread />}
                        </Col>
                    </Row>
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
    getProfile,
    getThreads
}
export default connect(mapStateToProps,mapDispatchToProps)(index)