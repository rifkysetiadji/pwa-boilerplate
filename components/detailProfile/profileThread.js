import React, { Component } from 'react'
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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Collapse from '@material-ui/core/Collapse';
import {Row,Col} from 'reactstrap'
import Textarea from 'react-textarea-autosize';
import {connect} from 'react-redux'
import moment from 'moment';
class profileThread extends Component {
    state={
        modal:false,
        // comment:false
    }
    commentToggle=(id)=>{
        this.setState({
            [id]: !this.state[id]
          });
      }
      
      renderThreads=()=>{
          if(this.props.thread.threads!==null){
            let threads=this.props.thread.threads.map(thread=>(
                <div>
                <Card key={thread._id}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" >
                        
                        <img src={this.props.auth.profile.avatar_url!==null?this.props.auth.profile.avatar_url:'/static/img/avadefault.png'} style={{width:'100%'}}/>
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={this.props.auth.profile.name}
                    subheader={moment(thread.created_at).format('MMMM DD ,YYYY')}
                />
               
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {thread.caption}
                    </Typography>
                </CardContent>
                <Collapse in={this.state[thread._id]} timeout="auto" unmountOnExit>
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
                    </IconButton>{thread.likes}
                    <IconButton aria-label="share" onClick={()=>this.commentToggle(thread._id)}>
                        <FontAwesomeIcon icon={faComment} />
                    </IconButton>{thread.comment.length}
                
                </CardActions>
                
                </Card>
                <br/>
                </div>
          ))
          return threads
          }else{
              return null
          }
          
      }
    render() {

        return (
            <div>
               {this.renderThreads()}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        auth:state.auth,
        thread:state.thread
    }
}
export default connect(mapStateToProps,null)(profileThread)