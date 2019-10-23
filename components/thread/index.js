import React, { Component } from 'react'
import {Row,Col} from 'reactstrap'
import './style.css'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment,faHeart,faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Spinner} from 'reactstrap';
import Collapse from '@material-ui/core/Collapse';
import Textarea from 'react-textarea-autosize';
import {connect} from 'react-redux'
import {getTimeline} from '../../redux/actions/thread'
import moment from 'moment'
class index extends Component {
    state={
        modal:false,
        comment:false
    }
    toggle=()=> {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      commentToggle=(id)=>{
        this.setState({
            [id]: !this.state[id]
          });
      }
      componentDidMount(){
        this.props.getTimeline(this.props.token.token)
      }
      renderthread=()=>{
          if(this.props.loading.getTimeline ){
              console.log('loading')
            return(
                <Spinner color="black"/>
            )
          }else{
              if(this.props.thread.timeline!==null){
                console.log('this.props.thread.timeline', this.props.thread.timeline)
                  let timeline=this.props.thread.timeline
                  let thread=timeline.map(res=>{
                    
                      return(
                          <div>
                    <Card >
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" >
                        <img src={res.user_id.avatar_url!==null?res.user_id.avatar_url:'/static/img/avadefault.png'} style={{width:'100%'}}/>
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={res.user_id.name}
                    subheader={moment(res.created_at).format('DD MMM YYYY')}
                />
                {/* <CardMedia
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                /> */}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {res.caption}
                    </Typography>
                </CardContent>
                <Collapse in={this.state[res._id]} timeout="auto" unmountOnExit>
                <CardContent>
                    <Row>
                        <Col md={10}>
                            <Textarea minRows={1} className="textarea-comment" placeholder="Comment thread" autoFocus/>

                        </Col>
                        <Col md={2}>
                            <IconButton aria-label="share">
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </IconButton>
                        </Col>
                    </Row>
                </CardContent>
                </Collapse>
                <CardActions disableSpacing>
                    <IconButton aria-label="share">
                        <FontAwesomeIcon icon={faHeart} />
                    </IconButton>
                    <IconButton aria-label="share" onClick={()=>this.commentToggle(res._id)}>
                        <FontAwesomeIcon icon={faComment} />
                    </IconButton>
                
                </CardActions>
                
                </Card>
                <br/>
                </div>
                )
                  })
                  return thread
              }
          }
      }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
                {this.renderthread()}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        thread:state.thread,
        loading:state.loading
    }
}
const mapDispatchToProps={
    getTimeline
}
export default connect(mapStateToProps,mapDispatchToProps)(index)