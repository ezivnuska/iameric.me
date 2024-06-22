const config = {
    DB_CONNECTION_STRING: 'mongodb+srv://eric:K1ngfish@iameric-serverless.pvh4pp1.mongodb.net/iameric?retryWrites=true&w=majority',
    IMAGE_PATH: 'https://www.iameric.me/assets',
    API_PATH: 'https://www.iameric.me/api',
    JWT_SECRET: 'super.super.secret.shhhh',
    development: {
        port: 4000, // Development port for server
        origin: 'http://localhost:3000', // Development origin for CORS
    },
    production: {
        port: 3000, // Production port for server
        origin: 'https://iameric.me', // Production origin for CORS
    },
}

module.exports = config