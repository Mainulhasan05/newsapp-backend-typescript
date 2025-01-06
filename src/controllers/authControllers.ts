import { refreshToken } from './../services/authServices';
import e, { Request, Response } from 'express';
import * as authService from '../services/authServices';
import { sendResponse } from '../utils/sendResponse';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import {generateAccessToken,generateRefreshToken} from '../utils/generateToken';
import setCookie from '../utils/setCookie';
// Register User
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roles } = req.body;
    const user = await authService.registerUser({ name, email, password, roles });

    // Generate token
    const token = generateRefreshToken({ id: user._id, roles: user.roles });

    // Set token in a secure cookie
    setCookie(res, 'refresh_token',token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 24 * 3600000) });

    const accessToken = generateAccessToken({ id: user._id, roles: user.roles });

    sendResponse({
      res,
      status: 201,
      success: true,
      message: 'User registered successfully',
      data: {user,accessToken},
    });
  } catch (error: any) {
    sendResponse({
      res,
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  try {
    
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    const refreshToken = generateRefreshToken({ id: user._id, roles: user.roles });
    
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 7 * 24 * 3600000),
    });
    
    const accessToken = generateAccessToken({ id: user._id, roles: user.roles });

    sendResponse({
      res,
      status: 200,
      success: true,
      message: 'Login successful',
      data: { accessToken },
    });
  } catch (error: any) {
    sendResponse({
      res,
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

// Get Profile
export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return sendResponse({
        res,
        status: 400,
        success: false,
        message: 'User is not authenticated',
      });
    }
    const userId = req?.user.id;
    const profile = await authService.getProfile(userId);
    sendResponse({
      res,
      status: 200,
      success: true,
      message: 'Profile retrieved successfully',
      data: profile,
    });
  } catch (error: any) {
    sendResponse({
      res,
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

// Assign Role
export const assignRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    const updatedUser = await authService.assignRole(userId, role);
    sendResponse({
      res,
      status: 200,
      success: true,
      message: 'Role assigned successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    sendResponse({
      res,
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

// Remove Role
export const removeRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    const updatedUser = await authService.removeRole(userId, role);
    sendResponse({
      res,
      status: 200,
      success: true,
      message: 'Role removed successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    sendResponse({
      res,
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

// Change Password
export const changePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return sendResponse({
        res,
        status: 400,
        success: false,
        message: 'User is not authenticated',
      });
    }
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(userId, oldPassword, newPassword);
    sendResponse({
      res,
      status: 200,
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error: any) {
    sendResponse({
      res,
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

export const refreshTokenController = (req: Request, res: Response) => {
  const token = req.cookies.refresh_token; // Assuming the refresh token is stored in an HTTP-only cookie

  if (!token) {
    return sendResponse({
      res,
      status: 401,
      success: false,
      message: 'Refresh token missing',
    });
  }

  const newAccessToken = authService.refreshToken(token);
  if (!newAccessToken) {
    return sendResponse({
      res,
      status: 403,
      success: false,
      message: 'Invalid refresh token',
    });
  }

  sendResponse({
    res,
    status: 200,
    success: true,
    message: 'Access token refreshed successfully',
    data: { accessToken: newAccessToken },
  });
};
