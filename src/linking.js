const linking = {
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            // Bips: {
            //     path: 'bips',
            //     screens: {
            //         BipList: {
            //             path: '',
            //         },
            //         Bip: {
            //             path: 'bip/:id',
            //         },
            //     }
            // },
            Bugs: {
                path: 'bugs',
            },
            Feed: {
                path: 'feed',
            },
            Home: {
                path: '',
            },
            Mail: {
                path: 'mail',
            },
            Play: {
                path: 'play',
            },
            Simple: {
                path: 'simple',
            },
            User: {
                path: 'user',
                screens: {
                    Profile: {
                        path: '/:username',
                    },
                    Images: {
                        path: '/:username/images',
                    },
                    // Map: {
                        //     path: 'map',
                        // },
                },
            },
            Users: {
                path: 'users',
                    // screens: {
                    //     List: {
                    //         path: '',
                    //     },
                    //     Profile: {
                    //         path: '/:username',
                    //     },
                    //     Images: {
                    //         path: '/:username/images',
                    //     },
                    // },
            },
            Work: {
                path: 'work',
            },
        },
    },
}
                    
export default linking