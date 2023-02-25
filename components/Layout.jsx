import React from 'react';
import Head from 'next/head';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children,user,setUser,key,setKey }) => {
  return (
    <div className="layout">
      <Head>
        <title>The Elec Store</title>
      </Head>
      <header>
        <Navbar user ={user} key={key} setUser={setUser} setKey={setKey}/>
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
        <Home/>
      </footer>
      
    </div>
  )
}

export default Layout
