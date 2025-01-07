import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/sendResponse';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return sendResponse({
      res,
      status: 401,
      success: false,
      message: 'Authentication token missing',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded; // Attach user details to the request object
    
    
    next();
  } catch (error) {
    return sendResponse({
      res,
      status: 401,
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export const authorize = (...roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const userRoles = req.user?.roles;
      
      if (!userRoles || !roles.some(role => userRoles.includes(role))) {
        return sendResponse({
          res,
          status: 403,
          success: false,
          message: 'Access denied: Insufficient permissions',
        });
      }
  
      next();
    };
  };