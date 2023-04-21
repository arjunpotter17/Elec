import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg'
import Profile from './Profile';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = ({user,setUser, setKey}) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [toggleUser, setToggleUser] = useState(false)

 

  return (
    <div className="navbar-container">
      <div>
        <p className="logo">
          <Link href="/">Elec!</Link>
        </p>
      </div>


      <div className='navbar-right'>
        {showCart && <Cart />}

        <button type="button" className="cart-icon" id='cart-icon' onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
        {user && <button type="button" id='profile-icon' className="cart-icon" onClick={() => setToggleUser(true)}>
          <CgProfile />
        </button>}

        <Link href='/login'>
          {!user && <button type="button" id="login-btn">
            Login
          </button>}
        </Link>



        {toggleUser && <Profile user={user} setToggleUser = {setToggleUser} setUser = {setUser} setKey={setKey} />}
      </div>
    </div>
  )
}

export default Navbar