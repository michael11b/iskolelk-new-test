import User from './../models/userModel.js';
import { sendResponse } from '../utils/responseHandler.js';

export const searchUsers = async (req, res) => {
    try {
        const { search } = req.query;

        if (search) {
            const users = await User.find({
                $or: [{ username: { $regex: search, $options: 'i' } }],
            });

            sendResponse(res, 200, "success", `${users.length} found...`, { users });
        } else {
            sendResponse(res, 400, "error", 'Search term cannot be empty');
        }
    } catch (err) {
        sendResponse(res, 500, "error", err.message);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        sendResponse(res, 200, "success", 'Users fetched successfully', { users });
    } catch (err) {
        sendResponse(res, 500, "error", err.message);
    }
};

export const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            sendResponse(res, 404, "error", 'User not found');
            return;
        }
        sendResponse(res, 200, "success", 'User fetched successfully', { user });
    } catch (err) {
        sendResponse(res, 500, "error", err.message);
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        sendResponse(res, 201, "success", 'User created successfully', { user });
    } catch (err) {
        sendResponse(res, 500, "error", err.message);
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            sendResponse(res, 404, "error", 'User not found');
            return;
        }
        sendResponse(res, 200, "success", 'User updated successfully', { user });
    } catch (err) {
        sendResponse(res, 500, "error", err.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            sendResponse(res, 404, "error", 'User not found');
            return;
        }
        sendResponse(res, 204, "success", 'User deleted successfully');
    } catch (err) {
        sendResponse(res, 500, "error", err.message);
    }
};
