export default {
    name:'orders',
    title:'Orders',
    type:'document',
    fields:[{
        name:'orderNumber',
        title:'order Number',
        type:'string'
    },
    {
        name:'orderedBy',
        title:'OrderedBy',
        type:'postedBy'
    },
    {
        name:'orderDetails',
        title:'Order Details',
        type:'array',
        of:[{type:'productArray'}]
        ,
    },
    {
        name:'orderedDate',
        title: 'Ordered Date',
        type: 'date'
    },
    {
        name:'deliveryDetails',
        title:'delivery Address',
        type:'string'
    }

    ]
}