import express from 'express';
import jwelleryRouter from "./routes/jwellery.js";
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import DBconnection from './db.js';
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';
import wishListRouter from "./routes/wishlist.js";
import cookieParser from 'cookie-parser';

// import { blackList } from './controllers/auth.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const server = express();

const allowedOrigins = ['http://localhost:3000']; // Add your frontend URL here

server.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// middleware
server.use(bodyParser.json());
server.use(cookieParser());
// Database connection function
DBconnection();

// routers
server.use("/jwellery", jwelleryRouter);
server.use("/cart", cartRouter);
server.use("/auth", authRouter);
server.use('/wishlist', wishListRouter)

server.listen(PORT, () => console.log(`server is running on ${PORT}`));