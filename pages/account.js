import {React, useEffect, useState} from 'react';
import { client } from '@/LIB/client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';


 

const Account = () => {

  const router = useRouter()
  const [userDet, setUserDet] = useState();
  const [phone, setPhone] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pinCode, setPinCode] = useState('')

  const handleSubmit = () =>{
    const address = line1.concat(line2+' '+city+' '+pinCode+' '+state)
    client
  .patch(userDet.sub) // Document ID to patch
  .set({address: address}, {phone}) // Shallow merge
  .commit() // Perform the patch and return a promise
  .then((data) => {
    console.log(data)
    localStorage.setItem('localDetails', JSON.stringify({
      address,
      phone
    }))
    router.push('javascript:history.back()');
    toast.success('Update Successful')
    
  })
  .catch((err) => {
    console.error('Oh no, the update failed: ', err.message)
  })
  }

  useEffect(()=>{

    const userDetails = async() => {
      if(localStorage){
        const user = await JSON.parse(localStorage.getItem('user'));
       setUserDet(user)
      }
    }

    userDetails();
    
  },[])


  
  return (
    <div style= {{marginTop:'60px'}}>
      <form className='address-form'>
        <div className='form-input'>
          <input type="text" placeholder='Name' value={userDet?.name} readOnly style={{width:'100%', backgroundColor:'#f5f5f5', color:'GrayText'}}/>
          
        </div>
        <div className='form-input email-div'>
        <input type="email" placeholder='E-mail' value={userDet?.email} readOnly style={{width:'49%', backgroundColor:'#f5f5f5', color:'GrayText'}} />
        <input type="string" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' style={{width:'49%'}} />
        </div>
        <div className='form-input address-div'>
          <input type="text" value={line1} onChange={(e) => setLine1(e.target.value)} placeholder='Address line 1' style={{width:'100%'}} />
          <input type="text" value={line2} onChange={(e) => setLine2(e.target.value)} placeholder='Address line 2' style={{width:'100%'}} />
        </div>
        <div className='form-input city-div'>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' style={{width:'32%'}}/>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder='State' style={{width:'32%'}}/>
          <input type='text' value={pinCode} onChange={(e) => setPinCode(e.target.value)} placeholder='Pincode' style={{width:'32%'}}/>
        </div>
        <button type='button' id='form-btn' onClick={handleSubmit}>Save</button>
      </form>
    </div>
  )
}

export default Account


