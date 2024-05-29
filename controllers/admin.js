import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";

export const admin = async(req, res, next) =>{

    const { email, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ email });
      // console.log("user from login: ",user);
  
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      // console.log(user);
      const token = jwt.sign({ userId: user._id },  process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      
      const refreshToken = jwt.sign({ userId: user._id },  process.env.REFRESH_JWT_SECRET, {
        expiresIn: "1d",
      });
    
      return res.status(200).json({ token, refreshToken, userId: user._id });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }  
}