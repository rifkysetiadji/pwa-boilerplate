import React, { Component } from 'react'
import AddThread from './addThread'
import './style.css'
export default class index extends Component {
    render() {
        
        return (
            <div>
                <AddThread token={this.props.token}/>
            </div>
        )
    }
}
