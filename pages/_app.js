import React from 'react';
import App, { Container } from 'next/app';

import OfflineSupport from '../components/servicesWorker';
import theme from '../components/theme'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import store from '../redux/store'
class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Provider store={store}>
        <OfflineSupport />
        <Component {...pageProps} />
        </Provider>
        
        </div>
    );
  }
}

export default CustomApp;
