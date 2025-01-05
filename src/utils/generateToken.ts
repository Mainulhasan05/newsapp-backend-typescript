import jwt from 'jsonwebtoken';

const generateToken = (payload: any, expiresIn: string) => {
    console.log("jwt secret",process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET
    || 'your_jwt_secret', { expiresIn });
}
export default generateToken;