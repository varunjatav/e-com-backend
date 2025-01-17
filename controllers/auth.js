import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { blackList } from "../middleware/auth.js";
import { sendPasswordResetMail, sendSignUpEmail } from "../mail.js";
import { validationResult } from "express-validator";

// User signup

export const signup = async (req, res) => {
  const { mobileNumber, email, firstName, lastName, password } = req.body;

  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      mobileNumber,
      email,
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      password: hashedPassword,
    });
    console.log("user from sign up: ", user);
    await sendSignUpEmail(email);
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email });
    console.log("user from login: ", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // console.log(user);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(200)
      .json({ token, refreshToken, userId: user._id, userRole: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Users list
export const Users = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
  // console.log(users);
};

// search user by name
export const searchUsersByName = async (req, res) => {
  try {
    const userName = req.query.userName;
    if (!userName) {
      res.status(404).json({ message: "user name not found" });
    }
    const user = await User.findOne({
      firstName: userName.toLowerCase(),
    });

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// single user
export const SingleUser = async (req, res) => {
  const { userId } = req.params;
  const singleUser = await User.findById(userId);
  res.status(200).json(singleUser);
};

export const sendPasswordReset = async (req, res) => {
  const { email, oldpassword, newpassword, cnewpassword } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({ email });
    // console.log("user : ", user);
    const isPasswordValid = await bcrypt.compare(oldpassword, user.password);
    if (isPasswordValid) {
      user.password = await bcrypt.hash(newpassword, 10);
      // console.log(user.password);
      // console.log(user);

      await sendPasswordResetMail({
        email,
        oldpassword,
        newpassword,
        cnewpassword,
      });
      await user.save();
    } else {
      res.status(400).send({ message: "Invalid password" });
    }

    res.status(200).send({ email, oldpassword, newpassword, cnewpassword });
  } catch (error) {
    res.status(400).send({ message: "Error in password reset" });
  }
};

// Users logout
export const Logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    blackList.push(token);
    return res.status(200).send("Logged Out");
  }
  res.status(400).json({ message: "No token provided" });
};

// refresh token auth
// In your auth.js controller

// Refresh Token endpoint
export const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  try {
    // Verify the refresh token
    const payload = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

    // Check if the refresh token is blacklisted (optional step)
    if (blackList.includes(refreshToken)) {
      return res.status(401).json({ message: "Refresh token blacklisted" });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: payload.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send the new access token in the response
    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    // Handle invalid refresh token or other errors
    console.error("Error refreshing token:", error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const { firstName, lastName, email, role, mobileNumber } = req.body;
    // console.log(req.body);
    if (!userId) {
      return res.status(404).json({ message: "user Id not found" });
    }
// console.log(firstName, lastName, email, role, mobileNumber);
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    console.log(user);
    const updates = {};
    if (firstName !== "") updates.firstName = firstName;
    if (lastName !== "") updates.lastName = lastName;
    if (email !== "") updates.email = email;
    if (role !== "") updates.role = role;
    if (mobileNumber !== "") updates.mobileNumber = Number(mobileNumber);
    updates.password = User.password;

    const updateUser = await User.findByIdAndUpdate(userId, updates, {
      neq: true,
      runValidators: true,
    });
    res.status(200).json({updateUser,  message:"user updated successfully"})
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
