import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      verified: user.verified,
      approved: user.approved,
      schoolId: user.schoolId,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, schoolId } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // For SUPER_ADMIN role
    if (role === 'SUPER_ADMIN') {
      const adminExists = await User.findOne({ role: 'SUPER_ADMIN' });
      let documentUrl = '';

      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'super_admin_docs',
            resource_type: 'auto',
          });
          documentUrl = result.secure_url;
        } catch (uploadError) {
          console.error('Cloudinary upload error:', uploadError);
          return res.status(400).json({ message: 'Error uploading document' });
        }
      }

      const user = await User.create({
        name,
        email,
        password,
        role,
        approved: !adminExists,
        verified: false,
        profileImage: '',
        documents: documentUrl,
      });

      const token = generateToken(user);

      return res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          verified: user.verified,
          approved: user.approved,
        },
      });
    }

    // For SCHOOL_ADMIN role
    if (role === 'SCHOOL_ADMIN') {
      if (!schoolId) {
        return res
          .status(400)
          .json({ message: 'School ID is required for SCHOOL_ADMIN role' });
      }

      const user = await User.create({
        name,
        email,
        password,
        role,
        approved: false,
        verified: false,
        schoolId: schoolId,
      });

      const token = generateToken(user);

      return res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          verified: user.verified,
          approved: user.approved,
          schoolId: user.school,
        },
      });
    }

    // For other roles
    const user = await User.create({
      name,
      email,
      password,
      role,
      approved: role === 'NORMAL',
      verified: false,
    });

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
        approved: user.approved,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.approved) {
      return res.status(403).json({ message: 'Account pending approval' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
        approved: user.approved,
        schoolId: user.schoolId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      user.email = email;
    }

    user.name = name || user.name;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingApprovals = async (req, res) => {
  try {
    const pendingUsers = await User.find({
      approved: false,
      role: { $ne: 'NORMAL' },
    }).select('-password');

    res.json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.approved = true;
    await user.save();

    res.json({ message: 'User approved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);

    res.json({ message: 'User rejected and removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
