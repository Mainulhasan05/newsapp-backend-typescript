import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register User
export const registerUser = async ({ name, email, password, roles }: any) => {
  if (roles && roles.includes('admin')) {
    throw new Error('Cannot register as admin directly');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, roles });
  return await user.save();
};

// Login User
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid email or password');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user._id, roles: user.roles }, JWT_SECRET, { expiresIn: '1d' });
  return token;
};

// Get Profile
export const getProfile = async (userId: string) => {
  return await User.findById(userId).select('-password');
};

// Assign Role
export const assignRole = async (userId: string, role: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (!user.roles.includes(role)) {
    user.roles.push(role);
  }
  return await user.save();
};

// Remove Role
export const removeRole = async (userId: string, role: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.roles = user.roles.filter(r => r !== role);
  return await user.save();
};

// Change Password
export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
  const user = await User.findById(userId).select('+password');
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) throw new Error('Incorrect old password');

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};
