import React, { Component } from 'react'

export default class servicesWorker extends Component {
    componentDidMount() {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker
            .register("/service-worker.js")
            .then(registration => {
              console.log("service worker registration successful");
            })
            .catch(err => {
              console.warn("service worker registration failed", err.message);
            });
        }
      }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
