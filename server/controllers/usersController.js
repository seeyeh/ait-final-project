import User from '../models/User';
import Split from '..models/Split';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select('-password').lean(); // retrieves a User doc
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
    const userObject = { username,
        "password": hashedPwd, 
        "exerciseNames": [],
        "templateNames": [],
        "splitNames": [],
        "stats": new Map()
    };

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
    const { id, username, password, exerciseNames, templateNames, splitNames, stats } = req.body;
    // Confirm data
    if(!username || !Array.isArray(exerciseNames) || !exerciseNames.length ||
    !Array.isArray(templateNames) || !templateNames.length ||
    !Array.isArray(splitNames) || !splitNames.length){
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec();
    // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {  // username already exists with a User document that is NOT our user; so this username is a duplicate, a no no!
        return res.status(409).json({ message: 'Duplicate username' })
    }
    if(usernames){  // if request has a requested new username, then update it
        user.username = username;
    }
    if(exerciseNames){  // "" new exerciseNames list (new entries)
        user.exerciseNames = exerciseNames;
    }
    if(templateNames){  // etc.
        user.templateNames = templateNames;
    }
    if(splitNames){ // etc.
        user.splitNames = splitNames;
    }
    if(password){
        user.password = await bcrypt.hash(password, 10) // hash with 10 salt rounds
    }
    const updatedUser = await user.save();
    res.json({message: `${updatedUser.username} updated`});
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req,res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'User ID Required'});
    }
    const splits = await Split.findOne({ parentUser: id }).lean().exec();
    if (splits?.length) {   // '?.' thing is optional chaining! "Expression short-circuits with a return value of undefined instead of causing error if reference is undefinned/null"
        return res.status(400).json({ message: 'User has assigned splits' }); // I think this is precaution for if we delete user that has lots of other docs connected to it
    }
    const user = await.User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message:'User not found' });
    }
    const result = await user.deleteOne() // result holds deleted user's information
    const reply = `Username ${result.username} with ID ${result._id} deleted`;
    res.json(reply);
})

export {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
