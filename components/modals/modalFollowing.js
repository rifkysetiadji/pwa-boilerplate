import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Spinner,Row,Col} from 'reactstrap';
import './style.css'
import {connect} from 'react-redux'
class modalFollowing extends Component {
    
  renderBody=()=>{
    if(this.props.loading.getFollowersLoading && this.props.search.result==null){
      return(
        <div style={{textAlign:'center'}}>
            <Spinner color="black"/>
          </div>
      )
    }else if(this.props.search.result!==null){
      
      let result=this.props.search.result.map(user=>(
        <div key={user._id}><Row className="container mt-2">
      <Col md={3} ><img src={user.avatar_url!==null?user.avatar_url:'/static/img/avadefault.png'} style={{width:'100%',borderRadius:50}}/></Col>
      <Col md={9} style={{color:'black',textAlign:'left',cursor:'pointer'}}><a href={`/profile?${user._id}`} style={{color:'black'}}>{user.name}</a></Col>
    </Row></div>
      ))
      return result
    }else{
      return (<p style={{color:'black'}}>Hmm,ga nemu</p>)
    }
  }
    render() {
        return (
            <div>
            <Modal isOpen={this.props.isOpen} fade={false} toggle={this.props.toggle} size="sm" className={this.props.className}>
              <ModalHeader toggle={this.props.toggle}>
                <input className="search-modal" placeholder="Following"/>
              </ModalHeader>
              <ModalBody>
                {this.renderBody()}
              </ModalBody>
            </Modal>
          </div>
        )
    }
}
const mapStateToProps=state=>{
  return{
    loading:state.loading,
    search:state.search
  }
}
export default connect(mapStateToProps)(modalFollowing)