const linking = {
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
                        path: '@images',
                    },
                },
            },
            Contacts: {
                path: '@contacts',
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