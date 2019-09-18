import React from 'react';
import App, { Container } from 'next/app';

import Header from '../components/nav';
import OfflineSupport from '../components/servicesWorker';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Header />
        <OfflineSupport />
        <Component {...pageProps} />
        </div>
    );
  }
}

export default CustomApp;
