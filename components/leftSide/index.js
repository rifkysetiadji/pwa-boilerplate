import React, { Component } from 'react'
import Profile from './profile'
export default class index extends Component {
    render() {
        return (
            <div>
                <Profile token={this.props.token}/>
            </div>
        )
    }
}
