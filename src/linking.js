const linking = {
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            Contacts: {
                path: 'users',
                screens: {
                    Contact: {
                        path: '/:username',
                    },
                    Images: {
                        path: '/:username/images',
                    },
                    Users: {
                        path: '',
                    },
                },
            },
            Feed: {
                path: 'feed',
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
            Work: {
                path: 'work',
            },
            Play: {
                path: 'play',
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
            Simple: {
                path: 'simple',
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

export default linking