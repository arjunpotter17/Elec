import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Arjun Mohan All rights reserved</p>
      <p className='icons'>
        <Link href='https://instagram.com/arjunpotter17/'>
        <AiFillInstagram/>
        </Link>

        <Link href='https://twitter.com/arjunpotter17/'>
        <AiOutlineTwitter/>
        </Link>
        
        
      </p>
    </div>
  )
}

export default Footer