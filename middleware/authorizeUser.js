import User from "../models/user.js";

export const authorizeUser = (requiredRole) =>  async(req, res, next) => {
  console.log("userId from authorizeUser: ",req.userId);
    try {
      const user = await User.findById(req.userId);
      console.log("user", user);
      if (user.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      
      next();
    } catch (error) {
      console.error('Error authorizing user:', error);
      res.status(500).json({ error: 'An error occurred while authorizing the user' });
    }
  };