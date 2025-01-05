import { Request, Response } from 'express';
import * as authService from '../services/authServices';
import { sendResponse } from '../utils/sendResponse';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
// Register User
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roles } = req.body;
    const user = await authService.registerUser({ name, email, password, roles });
    sendResponse({
      res,
      status: 201,
      success: true,
      message: 'User registered successfully',
      data: user,
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
    const token = await authService.loginUser(email, password);
    sendResponse({
      res,
      status: 200,
      success: true,
      message: 'Login successful',
      data: { token },
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
    const userId = req.user.id;
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
