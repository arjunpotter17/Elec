import React from 'react'
import Link from 'next/link';
import { client } from '@/lib/client';
import Image from 'next/image';


const Home = ({logo}) => {
  console.log('this is logo',logo)
  return (
    <Link href='https://portfolio-six-gold-18.vercel.app/#projects'>
    <div className='home-btn'>
        <Image src='/assets/footer-logo.jpg' alt='portfolio' width={55} height={55} style={{borderRadius:'50%', border:'none', objectFit:'cover', margin:'auto'}}/>
    </div>
    </Link>
    
  )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "logo"]';
    const logo = await client.fetch(query);
    
  
    return {
      props: { logo }
    }
  }

export default Home