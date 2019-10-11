import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Row,Col ,Card,CardBody} from 'reactstrap';
import {connect} from 'react-redux'
import {addClub} from '../../redux/actions/auth'
import './style.css'
import Cookies from 'universal-cookie'
const cookie=new Cookies()
const token=cookie.get('tokenCookie')
const activeStyle={
    background: 'linear-gradient(rgba(20,20,20, .5), rgba(20,20,20, .5))'
}
const club=[
    {
        id:1,
        name:'persija',
        img_url:'/static/img/liga/PERSIJAKT.png'
    },
    {
        id:2,
        name:'persib',
        img_url:'/static/img/liga/PERSIBdg.png'
    },
    {
        id:3,
        name:'arema',
        img_url:'/static/img/liga/AREMA.png'
    },
    {
        id:4,
        name:'persebaya',
        img_url:'/static/img/liga/PERSEBAYAsby.png'
    }
]
class index extends Component {
    state = {
        modal: false,
        club:[],
        selected:false
      };
      componentDidMount(){
          this.setState({modal:true})
      }
      toggle=()=> {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      
      onSelect=(clubs)=>{
            let a=this.state.club.filter(res=>{
                return res.id===clubs.id
            })
            let c
            if(a.length>0){
                c=this.state.club.filter(res=>{
                    return res.id!==a[0].id
                })
            }
        var joined = a.length>0?c:this.state.club.concat(clubs);
            this.setState({ 
                club: joined ,
                [clubs.id]:!this.state[clubs.id] 
            })
        
       
      }
      onSave=()=>{
        //   console.log(this.state.club)
          this.props.addClub(this.state.club,token.token)
          this.toggle()
      }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg" centered={true}>
                <ModalHeader toggle={this.toggle}>Pilih Klub</ModalHeader>
                <ModalBody>
                    <Row>
                        {club.map((club)=>(
                            <Col md={3} key={club.id}>
                            <Card className="card-logo" onClick={()=>this.onSelect(club)}  style={this.state[club.id]==true?activeStyle:null}>
                                <CardBody>
                                    <img src={club.img_url} style={{width:'100%'}}/>

                                </CardBody>
                            </Card>
                        </Col>
                        ))}
                        
                        
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="dark" onClick={this.onSave}>SIMPAN</Button>{' '}
                    {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button>  */}
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const mapDispatchToProps={
    addClub
}
const mapStateToProps=(state)=>{
    return{
        auth:state.auth
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(index)