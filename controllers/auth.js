import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { jwtSecret } from "../middleware/auth.js";
import { blackList } from '../middleware/auth.js';
import { sendMail } from "../mail.js";

// User signup
export const signup = async (req, res) => {
  const { mobileNumber, email, firstName, lastName, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      mobileNumber,
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Users list
export const Users = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users)
  console.log(users);
};

export const sendPasswordReset = async (req,res) => {
  const data = req.body;
  console.log(data);
  try {
    const isPasswordValid = await bcrypt.compare(password, data.newpassword);
    if(isPasswordValid){
      await sendMail(data);
    }else{
      res.status(400).send({message: "Invalid password"})
    }
    
    
  res.status(200).send(data); 
  } catch (error) {
    res.status(400).send({message: "Error in password reset"})
  }
 
}

// Users logout
export const Logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    blackList.push(token);
    return res.status(200).send('Logged Out');
  }
  res.status(400).json({ message: 'No token provided' });
};