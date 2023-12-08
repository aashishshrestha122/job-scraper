const config = {
    app: {
        port: process.env.PORT || '5000',
        saltKey: process.env.SALT_KEY || 'airtasker!',
        refreshTokenExpiryInMinute: process.env.REFRESH_TOKEN_EXPIRY_IN_MINUTE || '1440m', // 1 day
        accessTokenExpiryInMinute: process.env.ACCESS_TOKEN_EXPIRY_IN_MINUTE || '60m'
    },
    db: {
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        }
    }
}

export default config;
