import React, { useRef, useEffect, useState, use } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import { client } from '../lib/client';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';


const OrderSummary = () => {


    const router = useRouter()
    var cartProducts = []
    const { cartItems, toggleCartItemQuanitity, onRemove } = useStateContext();
    const [temp, setTemp] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [mail, setMail] = useState()
    const [line1, setLine1] = useState('')
    const [line2, setLine2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [toggleOnline, setToggleOnline] = useState('nothing')
    const [Address, setAddress] = useState()
    const [toggleDetails, setToggleDetails] = useState(false)
    const [okayOrder, setOkayOrder] = useState(false)
    const [users, setusers] = useState()
    const [products, setProducts] = useState()
    const [localAddress, setLocalAddress] = useState()
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setTemp(user?.sub)
        const localDetails = JSON.parse(localStorage.getItem('localDetails'));
        setLocalAddress(localDetails);

    
        const data = async () => {
            const query = `*[_type == "user"]{
                userName,
                userId,
                phone,
                email,
                address
            }`;
            const users = await client.fetch(query);
            setusers(users)
            const productsquery = `*[_type == "product"]{
                _id
            }`
            const fetchProducts = await client.fetch(productsquery)
         
            setProducts(fetchProducts)
        }

        data();

    }, [])


    for (let i = 0; i < cartItems.length; i++) {
        products?.map(product => {
            if (product._id.includes(cartItems[i]._id)) {
            
                cartProducts.push({
                    _type: 'productArray',
                    _ref: product._id,
                    _key: uuidv4(),
                })
            }
        })
    }

    const handlePay = () =>{
        const doc = {
            _type: 'orders',
            _id: `1ELEC2023${Math.floor(Math.random() * 9999)}`,
            orderNumber: `1ELEC2023${Math.floor(Math.random() * 9999)}`,
            orderedDate: today,
            orderedBy:{
                _type: 'postedBy',
                _ref: temp,
            },
            orderDetails: cartProducts,
            _key: uuidv4(),

        }

        client.createIfNotExists(doc).then((res) => {
            console.log(res)
        })

    }

    const handleCash = () =>{
        if(localAddress || okayOrder== true){
            handlePay();
            router.push('/success')
        }
        else{
            toast.error('"enter correct details')
        }
    }


    const handleSubmit = () => {
        if (line1 == '' || line2 == '' || city == '' || pincode == '' || state == '') {
            toast.error(`Please enter all the details`);
            return
        }
        else {
            const address = line1?.concat(line2, ' ', city, ' ', pincode, ' ', state);
            setOkayOrder(true)
            console.log(address)
            setAddress(address)
            setToggleDetails(true)
        }

    }

    const handleOnline = () => {

        if(localAddress || Address){
            handlePay();
            handleCheckout();
        }
        else{
            toast.error('"enter correct details')
        }
    }

    const handleCheckout = async () => {
        const stripe = await getStripe();
        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        });
        if (response.statusCode === 500) return;
        const data = await response.json();
        toast.loading('Redirecting...');
        stripe.redirectToCheckout({ sessionId: data.id });
    }


    return (
        <div className='order-summary' style={{ display: 'flex', marginTop: '60px', flexDirection: 'column', rowGap: '2rem' }}>
            <h2>Order Summary</h2>

            <div className="product-container">
                {cartItems.length >= 1 && cartItems.map((item) => (
                    <div className="product" key={item._id}>
                        <img src={urlFor(item?.image[0])} className="cart-product-image" />
                        <div className="item-desc">
                            <div className="flex top">
                                <h5>{item.name}</h5>
                                <h4>Rs. {item.price}</h4>
                            </div>
                            <div className="flex bottom">
                                <div>
                                    <p className="quantity-desc">
                                        <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                                            <AiOutlineMinus />
                                        </span>
                                        <span className="num" onClick="">{item.quantity}</span>
                                        <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}><AiOutlinePlus /></span>
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="remove-item"
                                    onClick={() => onRemove(item)}
                                >
                                    <TiDeleteOutline />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {temp && <div className='delivery-details-box'>
                <h4>Delivery Details</h4>
                {users?.map(user => {
                    if (user.userId == temp) {
                        return (
                            <div key={user.userId} style={{ fontWeight: 'bold' }}>
                                <p>Name: {user.userName}</p>
                                <p>Phone: {localAddress? localAddress.phone:'Please update phone'}</p>
                                <p>Email: {user.email}</p>
                                <p>Address: {localAddress? localAddress.address:'Please update address'}</p>
                                
                                <Link href='account'>
                                    <button id='edit-details-btn'>Edit Details</button>
                                </Link>
                            </div>
                        )
                    }
                })}
            </div>}

            {!temp && !Address &&
                <div className='temp-user-form'>

                    <form className='address-form'>
                        <h4>Delivery Details</h4>
                        <div className='form-input'>
                            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', backgroundColor: '#f5f5f5', color: 'GrayText' }} />

                        </div>
                        <div className='form-input email-div'>
                            <input type="email" placeholder='E-mail' required value={mail} onChange={(e) => setMail(e.target.value)} style={{ width: '49%', backgroundColor: '#f5f5f5', color: 'GrayText' }} />
                            <input type="string" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' required style={{ width: '49%' }} />
                        </div>
                        <div className='form-input address-div'>
                            <input type="text" value={line1} onChange={(e) => setLine1(e.target.value)} placeholder='Address line 1' required style={{ width: '100%' }} />
                            <input type="text" value={line2} onChange={(e) => setLine2(e.target.value)} placeholder='Address line 2' required style={{ width: '100%' }} />
                        </div>
                        <div className='form-input city-div'>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' required style={{ width: '32%' }} />
                            <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder='State' required style={{ width: '32%' }} />
                            <input type='text' value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder='Pincode' required style={{ width: '32%' }} />
                        </div>
                        <button type='button'  id='form-btn' onClick={() => { handleSubmit() }}>Save</button>
                    </form>
                </div>
            }

            {toggleDetails == true &&
                (
                    <div className='display-block'>
                        <p><span >Name:</span>  {name}</p>
                        <p><span>Phone:</span>  {phone}</p>
                        <p><span>Email:</span>  {mail}</p>
                        <p><span>Address:</span>  {Address}</p>
                        <button className='btn' onClick={() => { setAddress(null); setToggleDetails(false) }}>Edit Details</button>
                    </div>
                )

            }


            <div className='payment-method'>
                <h4>Payment Methods</h4>
                <div style={{ display: 'flex', columnGap: '2rem' }}>
                    <div><label for='online' style={{ fontWeight: 'bold' }}>Online</label> <input id='online' name='radio' type='radio' onClick={() => { setToggleOnline(true) }} /></div>
                    <div><label for='cash' style={{ fontWeight: 'bold' }}>Cash</label> <input id='cash' name='radio' type='radio' onClick={() => { setToggleOnline(false) }} /></div>



                </div>
            </div>

            {toggleOnline == true && <button type="button" className="btn" onClick={handleOnline}>
                Complete Order
            </button>}

            {toggleOnline == false &&
                <button type="button" className="btn" onClick={handleCash}>
                    Place order
                </button>
            }
        </div>
    )

}



export default OrderSummary

