export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'userName',
            title: 'User Name',
            type:'string'
        },
        {
            name: 'userId',
            title: 'User ID',
            type: 'string'
        },

        {
            name: 'image',
            title: 'Image',
            type:'string'
        },
        {
            name: 'phone',
            title: 'Phone',
            type:'string'
        },
        {
            name: 'email',
            title: 'E-mail',
            type:'email'
        },
        {
            name:'address',
            title:'Address',
            type:'string'
        }

    ]
}