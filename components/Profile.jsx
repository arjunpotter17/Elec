import React from 'react'
import { AiOutlineLeft } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';




const Profile = ({user, setToggleUser, setUser, setKey }) => {

  const router = useRouter()
  console.log(user)
  const handleLogout = async () =>{
    await router.push('/')
    
    setUser(null)
    setKey(Math.random());
    setToggleUser(false)
    localStorage.removeItem('user')
   
  }

  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={() => setToggleUser(false)}>
          <AiOutlineLeft />
          <span className='heading'>Profile</span>
        </button>

        <div className='product-container'>
            <div style={{display:'flex', justifyContent:'center'}}>
            <img src={user.picture} alt='user-icon' style={{width:'200px', height:'200px', borderRadius:'50%', margin:'auto'}} className='profile-image'/>
            </div>
            
          
          <div className='profile-btn-container'>
          <Link href='/account'><button type='button' className='btn profile-btn' onClick={() => {setToggleUser(false)}}>Edit Details</button></Link>
           <Link href='/orders'><button type='button' className='btn profile-btn' onClick={() => setToggleUser(false)}>Orders</button></Link>
          </div>
        </div>

        <div className='cart-bottom'>
            
            <div className='btn-container'>
              <button className='btn' id='logout-btn' type='button' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        
      </div>
      
      
    </div>
  )
}

export default Profile