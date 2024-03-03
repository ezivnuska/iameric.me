export default linking = {
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            SignIn: 'signin',
            Secure: {
                path: '',
                screens: {
                    Orders: {
                        path: 'orders',
                        screens: {
                            OrderList: '',
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
                },
            },
            Settings: {
                path: 'settings',
                screens: {
                    Profile: '',
                    Images: 'images',
                    Products: {
                        path: 'products',
                        screens: {
                            ProductList: '',
                        },
                    },
                }
            },
            Fallback: 'oops',
        },
    },
}