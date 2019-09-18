
import React, { Component } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import './style.css'
export default class index extends Component {
 
  render() {
    return (
      <div>
         <Head>
      <title>Home</title>
    </Head>

      <p className="test">hallo</p>
      </div>
    )
  }
}
