import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// export const verifyToken = (req, res, next) => {
//   const authorization = req.headers.autorization;
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res.status(401).json('Not authorized');
//   }
//   const token = authorization.split('Bearer ')[1];
//   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json('Invalid token');
//     }
//     req.user = decoded;
//     next();
//   });
// };

export const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({ message: 'invalid token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'no token' });
  }
};
