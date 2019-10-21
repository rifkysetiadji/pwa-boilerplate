import React, { Component } from 'react'
import {Row,Col,Button,Modal, ModalHeader, ModalBody, ModalFooter,} from 'reactstrap'
import {connect} from 'react-redux'
import {getProfile,follow,unFollow} from '../../redux/actions/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {debounce} from 'lodash'
import './style.css'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
class profileDetail extends Component {
    state={
        showEdit:false,
        email:this.props.auth.profile.email,
        name:this.props.auth.profile.name,
        image:null,
        modal:false,
        image_url:'',
        croppedImageUrl:null,

        crop:{
            aspect:16 / 9 

        }
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
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
              //reject(new Error('Canvas is empty'));
              console.error("Canvas is empty");
              return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = URL.createObjectURL(blob);
            resolve(this.fileUrl);
          }, "image/jpeg");
        });
      }
      updateAva=()=>{
        this.toggleFoto()
        console.log('object', this.state.croppedImageUrl)
      }
    render() {
        let profile=this.props.auth.profile
        return (
            <div>
                 <Modal isOpen={this.state.modal} toggle={this.toggleFoto} fade={false} className={this.props.className} size="lg" >
                     <ModalHeader>Edit avatar</ModalHeader>
                     <ModalBody>
                         {/* <img src={this.state.image_url} style={{width:'100%'}}/> */}
                         <ReactCrop onImageLoaded={this.onImageLoaded} src={this.state.image_url} crop={this.state.crop} onChange={(newCrop)=>this.setCorp(newCrop)}  onComplete={this.onCropComplete} />
                         {/* {this.state.croppedImageUrl && (
                            <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.croppedImageUrl} />
                        )} */}
                        
                        <ModalFooter><Button color="dark" onClick={this.updateAva}>Update</Button></ModalFooter>
                     </ModalBody>
                 </Modal>
                <Row>
                <Col md={3} >
                    {profile.self?
                        <label>
                        <div className="img-profile" style={{backgroundImage:this.state.croppedImageUrl!==null?`url(${this.state.croppedImageUrl})`:"url('/static/img/avadefault.png')"}}>
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