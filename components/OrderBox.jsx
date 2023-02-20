import { urlFor } from '@/lib/client'
import React from 'react'

const OrderBox = ({orders,temp}) => {
    const reqOrders = orders?.filter(order=>order.orderedBy?.userId == temp)
    const uniqueChars = [...new Set(reqOrders)];
 
  return (
        <>
        {uniqueChars?.map(order =>(
        <div className='order-container' key={order.orderNumber} style={{fontWeight:'bold'}}>
            <div className='order-product-container'>
                {order?.orderDetails?.map(product => (
                    <div key={product._id} style={{display:'flex', columnGap:'1rem'} }>
                    <div>
                        <img src={urlFor(product?.image[0])} className='order-img' alt='product-img'/>
                    </div>
                    <div>
                        <p>{product?.name?.length>20?product.name.substring(0,12).concat('...'):product.name}</p>
                        <p>Rs. {product?.price}</p>
                    </div>
                    </div>
                    
                ))}
            </div>
            <div>
            <p>Order No:{order.orderNumber}</p>
        <p>Date:{order.orderedDate}</p>
            </div>
       
        </div>
       ))}
        </>
       
    
  )
}

export default OrderBox