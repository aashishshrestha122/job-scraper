const config = {
    app: {
        port: process.env.PORT || '5000',
        saltKey: process.env.SALT_KEY || 'airtasker!',
        refreshTokenExpiryInMinute: process.env.REFRESH_TOKEN_EXPIRY_IN_MINUTE || '1440m', // 1 day
        accessTokenExpiryInMinute: process.env.ACCESS_TOKEN_EXPIRY_IN_MINUTE || '60m'
    },
    db: {
        connection: {
            host: process.env.DBHOST,
            port: process.env.DBPORT,
            user: process.env.DBUSER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        }
    }
}

export default config;
