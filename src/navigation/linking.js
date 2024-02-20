export default linking = {
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            Start: 'start',
            Orders: {
                path: 'orders',
                screens: {
                    OrderList: '',
                },
            },
            Products: {
                path: 'products',
                screens: {
                    ProductList: '',
                },
            },
            Users: {
                path: 'users',
                screens: {
                    UserList: '',
                    User: '/:id',
                },
            },
            Vendors: {
                path: 'vendors',
                screens: {
                    VendorList: '',
                    Vendor: '/:id',
                },
            },
            Forum: 'forum',
            Images: 'images',
            Settings: 'settings',
            Fallback: 'oops',
        },
    },
}