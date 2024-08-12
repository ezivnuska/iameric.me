export default linking = {
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            Contact: {
                path: 'contact',
                screens: {
                    Details: {
                        path: '/:username',
                    },
                    ContactImages: {
                        path: 'images',
                    },
                },
            },
            Contacts: {
                path: 'contacts',
            },
            Forum: {
                path: 'forum',
            },
            Home: {
                path: '',
            },
            Mail: {
                path: 'mail',
            },
            About: {
                path: 'about',
            },
            Bips: {
                path: 'bips',
                screens: {
                    BipList: {
                        path: '',
                    },
                    Bip: {
                        path: 'bip/:id',
                    },
                }
            },
            User: {
                path: 'user',
                screens: {
                    Profile: {
                        path: 'profile',
                    },
                    Images: {
                        path: 'images',
                    },
                    Map: {
                        path: 'map',
                    },
                },
            },
        },
    },
}