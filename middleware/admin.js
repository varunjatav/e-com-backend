// admin function
export const isAdmin =  (req, res,next) => {
    // Check if the user is an admin
  if (req.user.role === 'admin') {
    // User is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not an admin, return a 403 Forbidden error
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
}
  