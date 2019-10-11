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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Collapse from '@material-ui/core/Collapse';
import Textarea from 'react-textarea-autosize';
export default class index extends Component {
    state={
        modal:false,
        comment:false
    }
    toggle=()=> {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      commentToggle=()=>{
        this.setState(prevState => ({
            comment: !prevState.comment
          }));
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
                <Card >
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" >
                        R
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                {/* <CardMedia
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                /> */}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <Collapse in={this.state.comment} timeout="auto" unmountOnExit>
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
                    <IconButton aria-label="share" onClick={this.commentToggle}>
                        <FontAwesomeIcon icon={faComment} />
                    </IconButton>
                
                </CardActions>
                
                </Card>
            </div>
        )
    }
}
