import User from '../models/User';
import Split from '..models/Split';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select('-password').lean();
    if(!users){
        return res.status(400).json({message:'No users found'});
    }
    res.json(users);
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req,res) => {
    const { username, password } = req.body

    // Confirm data
    if(!username || !password) {
        return res.status(400).json({ message: 'All fields are required'});
    }

    // Check for duplicates
    const duplicate = await User.findOne({ username }).lean().exec();

    if(duplicate){
        return res.status(409).json({message: 'Duplicate username'});
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10) // hash and add 10 salt rounds to the password

    const userObject = { username, "password": hashedPwd };

    // Create and store new user
    const user = await User.create(userObject);

    if (user) { //created
        res.status(201).json({ message: `New user ${username} created`})
    } else {
        res.status(400).json({ message: 'Invalid user data received'});
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req,res) => {
    const { id, username, rolles}
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req,res) => {

})

export {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
