import express from 'express';
import jwelleryRouter from "./routes/jwellery.js";
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import DBconnection from './db.js';
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';
import wishListRouter from "./routes/wishlist.js";


dotenv.config();
const PORT = process.env.PORT || 5000;
const server = express();

server.use(cors());


// middleware
server.use(bodyParser.json());

// Database connection function
DBconnection();

// routers
server.use("/jwellery", jwelleryRouter);
server.use("/cart", cartRouter);
server.use("/auth", authRouter);
server.use('/wishlist', wishListRouter);


server.listen(PORT, () => console.log(`server is running on ${PORT}`));