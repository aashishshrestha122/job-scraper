const { Pool } = require('pg');

// Create a new PostgreSQL client

const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST, // Change to your host if it's not localhost
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT, // Default PostgreSQL port
});

// Connect to the database
pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
        // You're connected! You can perform database operations here
    })
    .catch(err => console.error('Error connecting to PostgreSQL', err))
    .finally(() => {
        // End the client connection when done
        pool.end();
    });

export default pool;
