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
            User: {
                path: 'user',
                screens: {
                    Profile: {
                        path: 'profile',
                    },
                    Images: {
                        path: 'images',
                    },
                }
            },
        },
    },
}