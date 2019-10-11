import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './style.css'
export default class index extends Component {
    
        
    render() {
        return (
            <div>
            <Modal isOpen={this.props.isOpen} fade={false} toggle={this.props.toggle} size="sm" className={this.props.className}>
              <ModalHeader toggle={this.props.toggle}>
                <input className="search-modal" placeholder={this.props.flag}/>
              </ModalHeader>
              <ModalBody>
                
              </ModalBody>
            </Modal>
          </div>
        )
    }
}
