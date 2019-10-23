import React, { Component } from 'react'
import {Row,Col,Button,Modal, ModalHeader, ModalBody, ModalFooter,} from 'reactstrap'
import {connect} from 'react-redux'
import {getProfile,follow,unFollow,uploadAva,updateProfile} from '../../redux/actions/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {debounce} from 'lodash'
import './style.css'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 
import {getFollower,getFollowing}  from '../../redux/actions/search'
import ModalsFollowers from '../modals/modalFollowers'
import ModalsFollowing from '../modals/modalFollowing'
const cropper = React.createRef();
class profileDetail extends Component {
    state={
        showEdit:false,
        name:this.props.auth.profile.name,
        image:null,
        modal:false,
        image_url:'',
        croppedImageUrl:null,

        crop:{
            aspect:16 / 9 

        },
        showFollowers:false,
        showFollowing:false,
    }
    showFollowers=async()=>{
        this.props.getFollower(this.props.token.token,this.props.auth.profile.id)
        this.setState({showFollowers:!this.state.showFollowers})
        
    }
    showFollowing=()=>{
        this.props.getFollowing(this.props.token.token,this.props.auth.profile.id)
        this.setState({showFollowing:!this.state.showFollowing})
    }
    toggleEdit=()=>{
        this.setState({
            showEdit:!this.state.showEdit
        })
    }
    toggleFoto=()=>{
        this.setState({modal:!this.state.modal})
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
    onChangeImage=(evt)=>{
      const file = evt.target.files[0];
      const fileTypes = ['jpg', 'jpeg', 'png'];
  
      if (evt.target.files && file) {
          const extension = evt.target.files[0].name.split('.').pop().toLowerCase();
          const isSuccess = fileTypes.indexOf(extension) > -1;
          if (isSuccess) {
              if (file.size <= 5000000) { 
                  let img_url=
                  this.setState({
                      image: file,
                      image_url:URL.createObjectURL(file),
                      modal:true
                  });
              }
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
    setCorp=(newCrop)=>{
        this.setState({crop:newCrop})
    }
    onCropComplete = crop => {
        this.makeClientCrop(crop);
      };
      onImageLoaded = image => {
        this.imageRef = image;
      };
    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            "newFile.jpeg"
          );
          this.setState({ croppedImageUrl });
        }
      }
    
      getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
        // let image_crop=canvas.toDataURL("image/png")
        // return image_crop
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
              //reject(new Error('Canvas is empty'));
              console.error("Canvas is empty");
              return;
            }
            console.log('canvas', blob)
            resolve(blob)
            // blob.name = fileName;
            // window.URL.revokeObjectURL(this.fileUrl);
            // this.fileUrl = URL.createObjectURL(blob);
            // resolve(this.fileUrl);
          }, "image/jpeg");
       
        });
      }
       updateAva=()=>{
        this.toggleFoto()
        let fd = new FormData()
        fd.append('img_url', this.state.croppedImageUrl!==null?this.state.croppedImageUrl:this.state.image)
        this.props.uploadAva(this.props.token.token,fd)
      }
      updateProfile=()=>{
          let data={
              name:this.state.name
          }
          this.props.updateProfile(this.props.token.token,data)
      }
    render() {
        let profile=this.props.auth.profile
        return (
            <div>
                 {this.state.showFollowers?<ModalsFollowers  isOpen={this.state.showFollowers} toggle={this.showFollowers} />:null}
                 {this.state.showFollowing?<ModalsFollowing   isOpen={this.state.showFollowing} toggle={this.showFollowing}/>:null}
                 <Modal isOpen={this.state.modal} toggle={this.toggleFoto} fade={false} className={this.props.className} size="lg" >
                     <ModalHeader>Edit avatar</ModalHeader>
                     <ModalBody>
                         <ReactCrop onImageLoaded={this.onImageLoaded} src={this.state.image_url} crop={this.state.crop} onChange={(newCrop)=>this.setCorp(newCrop)}  onComplete={this.onCropComplete} />
                        <ModalFooter><Button color="dark" onClick={this.updateAva}>Update</Button></ModalFooter>
                     </ModalBody>
                 </Modal>
                <Row>
                <Col md={3} >
                    {profile.self?
                        <label>
                        <div className="img-profile" style={{backgroundImage:profile.avatar_url!==null?`url(${profile.avatar_url})`:"url('/static/img/avadefault.png')"}}>
                            <p className="text-edit">Edit</p>
                        </div>
                        <input id="file-input" onChange={this.onChangeImage} type="file" style={{display:'none'}}/>
                        </label>
                    :
                        <img src="/static/img/avadefault.png" style={{width:'100%',borderRadius:5}}/>
                    }
                </Col>
                <Col md={9} >
                    <h2>{profile.name}&nbsp;&nbsp;<span>{profile.self?<Button color="dark" onClick={this.toggleEdit}><FontAwesomeIcon icon={faEdit} /></Button>:this.followUnFollowEngine()}</span></h2>
                    <p><span style={{cursor:'pointer'}} onClick={this.showFollowers}>{profile.followersCount} pengikut</span>&nbsp;&nbsp;<span onClick={this.showFollowing} style={{cursor:'pointer'}}>{profile.followingCount} mengikuti</span>&nbsp;&nbsp;{profile.threadsCount} thread</p><br/>
                    {this.state.showEdit==true?
                        <>
                        <div>
                            <label>Nama</label>&nbsp;&nbsp;&nbsp;
                            <input type="text" onChange={(e)=>this.setState({name:e.target.value})} value={this.state.name}/>
                        </div>
                        <Button color="dark" onClick={this.updateProfile}>UPDATE</Button>
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
    unFollow,
    uploadAva,
    getFollower,
    getFollowing,
    updateProfile
}
export default connect(mapStateToProps,mapDispatchToProps)(profileDetail)