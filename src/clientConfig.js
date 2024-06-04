const clientConfig = {
    development: {
        // port: 3000, // Development port for the client
        port: 4321, // Development port for the client
    },
    production: {
        // port: window.location.hostname === 'localhost' ? 4000 : 4321, // Production port for the client
        port: 3000, // Production port for the client
    },
}

export default clientConfig