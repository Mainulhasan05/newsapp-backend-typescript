import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your_refresh_secret';

export const generateAccessToken = (payload:any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '150m' }); // Short-lived access token
};

export const generateRefreshToken = (payload: any): string => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' }); // Long-lived refresh token
};
