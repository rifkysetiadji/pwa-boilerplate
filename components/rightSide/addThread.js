import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Textarea from 'react-textarea-autosize';
import {Button} from 'reactstrap'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {addThread} from '../../redux/actions/thread'
import {connect} from 'react-redux'
class addThreads extends Component {
    state={
        caption:''
    }
    onPublish=()=>{
        let data={
            caption:this.state.caption
        }
        console.log(this.props.token.token)
        this.props.addThread(this.props.token.token,data)
    }
    render() {
        return (
           <Card>
               <CardContent>
                    <h3>Tulis Thread</h3>
                    <Textarea minRows={3} onChange={(e)=>{this.setState({caption:e.target.value})}} className="textarea-thread"/>
                    
                   
                   
               </CardContent>
               <CardActions disableSpacing>
               <Button color="dark" onClick={this.onPublish}>Publish</Button>&nbsp;&nbsp;
               <div className="image-upload" >
                    <label  style={{cursor:'pointer'}}>
                        <FileCopyIcon/>
                    </label>
                    <input id="file-input" type="file" style={{display:'none'}}/>
                    </div>
                </CardActions>
           </Card>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        auth:state.auth
    }
}
const mapDispatchToProps={
    addThread
}
export default connect(mapStateToProps,mapDispatchToProps)(addThreads)