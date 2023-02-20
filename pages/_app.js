import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import { useRouter } from 'next/router';



function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState()
  const [key, setKey] = useState()
  const router = useRouter();
  useEffect(()=>{
    if(localStorage){
      setUser(JSON.parse(localStorage.getItem('user')))
      setKey(Math.random())
    }
    
  },[router.query])


  return (
    <StateContext>
      <Layout user ={user} key={key} setUser={setUser} setKey={setKey}>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp