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
            Map: {
                path: 'map',
            },
            Mail: {
                path: 'mail',
            },
            About: {
                path: 'about',
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
                },
            },
        },
    },
}