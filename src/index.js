import express from 'express';
import cors from 'cors';

import './env.js';
import './db.js';
import config from './config.js';
import * as errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';

const app = express();
import morgan from 'morgan';
// const swaggerUi = require("swagger-ui-express");
// const swaggerDoc = require("./swagger.json");
import swaggerUi from 'swagger-ui-express';

import swaggerDoc from './swagger.json';

//swagger will run on localhost:3000/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Morgan used as middleware for logging
app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({
        app: "Air Tasker",
        version: '0.0.1'
    });
});


// Error Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

const PORT = config.app.port;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})