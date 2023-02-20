import React, { useEffect,useState } from 'react'
import { client } from '@/lib/client'
import OrderBox from '@/components/OrderBox'
const Orders = () => {
    

    const [temp, setTemp] = useState()
    const [orders,setOrders] = useState()
 
    useEffect(()=>{
        const getUser = async () =>{
            if(localStorage){
                const user = JSON.parse(localStorage.getItem('user')) 
                setTemp(user.sub)
            }

            const query = `*[_type == "orders"]{
              orderNumber,
              orderedDate,
              deliveryDetails,
              orderedBy ->{
                  userName,
                  userId
              },
              orderDetails[] -> {
                  name,
                  image,
                  slug,
                  price
              }
          }`;
          const orders = await client.fetch(query);
          setOrders(orders)
        }

        getUser();

       
    },[])

    console.log(orders)

        
  return (
    <div className='previous-order-container'  style={{display:'flex', flexDirection:'column', rowGap:'1.5rem', marginTop:'60px'}}>
        <OrderBox orders = {orders} temp={temp}/>
    </div>
  )
}

export default Orders
