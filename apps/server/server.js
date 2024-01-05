import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser';
import { connectdb } from './src/config/database.js';
import { corsOptions } from './src/config/corsOptions.js';
import { credentials } from './src/middlewares/credentialsMiddleware.js';

// import middleware
import ErrorMiddleware from './src/middlewares/errorMiddleware.js';

// import routes
import authRoutes from './src/routes/authRoutes.js'
import adminRoutes from './src/routes/adminRoutes.js'
import tokenRoutes from './src/routes/tokenRoutes.js'

// dov env
dotenv.config({path: '.env'});

// express app
const app = express();

// middlewares
app.use(credentials)
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));

// configuration
connectdb();

// port
const PORT = process.env.PORT || 8000;

// listen
app.listen(PORT, () => console.log(`Listening on port number ${PORT}`));

// routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/token", tokenRoutes)

// error middleware
app.use(ErrorMiddleware);