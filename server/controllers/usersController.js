import User from '../models/User.js';
import Split from '../models/Split.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select('-password').lean(); // retrieves a User doc
    if(!users?.length){
        return res.status(400).json({message:'No users found'});
    }
    res.json(users);
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req,res) => {
    const { username, password } = req.body

    // Confirm data (both username and password need to be in request body)
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


    /* REFACTORED PATCH APPROACH

    const {ops, path, data} = req.body;
    
    // Confirm data (at a minimum, id and username have to be in req body)
    if(!path.id || !path.username){
        return res.status(400).json({ message: 'ID and username fields are required' });
    }
    switch(ops) {
        case "add":
            switch(path.location)
                case "split": user.splits.push(data); break;
                case "template": user.templates.push(data); break;

            OR 

            if(data.split) user.splits.push(data.split)
            if(data.template) user.templates.push(data.templates)
            if(data.exercise) user.exercises.push(data.exercises)
            
        case "replace":
            if(data.username) user.username = data.username
            ...

    }
     
    */

    // Confirm data (at a minimum, id and username have to be in req body)
    if(!id || !username){
        return res.status(400).json({ message: 'ID and username fields are required' });
    }
    const user = await User.findById(id).exec();    // Get the actual specific User document we want to update and save by ID
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec(); 
    // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {  // requested username already exists with a User document that is NOT our user; so a no no, we don't want two users w same username!
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username;
    
    if(exerciseNames){  // if request contains a new exerciseNames list (new entries) to update the document's exerciseNames list with
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
    if (!id) {  // Request must have an ID bc we need ID to find the User document to delete
        return res.status(400).json({ message: 'User ID Required'});
    }

    const splits = await Split.findOne({ parentUser: id }).lean().exec();   // Find Split documents whose parentUser is the User we want to delete; if there is one, error - don't delete User!
    if (splits?.length) {   // '?.' thing is optional chaining! "Expression short-circuits with a return value of undefined instead of causing error if reference is undefinned/null"
        return res.status(400).json({ message: 'User has assigned splits' }); // I think this is precaution for if we delete user that has lots of other docs connected to it
    }
    // TODO: write similar code for the other documents that a User is linked to

    const user = await User.findById(id).exec();
    if (!user) {    // If no User document with requested ID
        return res.status(400).json({ message:'User not found' });
    }
    const result = await user.deleteOne() // deletes User document; result holds deleted user's information
    const reply = `Username ${result.username} with ID ${result._id} deleted`;
    res.json(reply);
})

export default {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
