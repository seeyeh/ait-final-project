import Template from '../models/Template.js';
import Split from '../models/Split.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

const SplitSchemaFields = Object.freeze({
  _id: Symbol('_id'),
  parentUser: Symbol('parentUser'),
  name: Symbol('name'),
  description: Symbol('description'),
  templates: Symbol('templates')
});

// @desc Get all splits
// @route GET /splits
// @access Private
const getSplit = asyncHandler(async (req, res) => {
  const { parentUser } = req.query; // extract key/value pair of 'name' key from query string
  if (!parentUser) return res.status(400).json({ message: 'parentUser field required' });

  // check if all fields of query are valid
  for (let field in req.query) {
    if (field in SplitSchemaFields === false)
      return res.status(400).json({ message: `Invalid query field '${field}'` });
  }

  // populate activities with template names
  const splits = await Split.find(req.query).lean().exec();

  if (!splits?.length) {
    return res.status(400).json({ message: `No splits found` });
  }

  res.json(splits);
});

// @desc Create new split
// @route POST /splits
// @access Private
const createNewSplit = asyncHandler(async (req, res) => {
  const { parentUser, templates } = req.body;
  // Confirm data (parentUser and name required)
  if (!parentUser || !Array.isArray(templates) || templates.length === 0) {
    return res.status(400).json({ message: 'parentUser and templates array are required' });
  }
  // check if all fields of body are valid
  for (let field in req.body) {
    if (field in SplitSchemaFields === false)
      return res.status(400).json({ message: `Invalid input field '${field}'` });
  }

  // convert templates of request body into attempt schema
  let templateIds = await Promise.all(
    templates.map(async (template) => Template.findOne({ parentUser, _id: template }).select('_id').exec())
  );
  templateIds = templateIds.filter((e) => e);
  // create and store new split document
  const split = new Split({
    ...req.body,
    templates: templateIds
  });
  try {
    await split.save();
    res.status(201).json({ message: `New split ${split.name} created` });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: `Invalid split data received: ${err}` });
  }
});

// @desc Update an split
// @route PATCH /splits
// @access Private
const updateSplit = asyncHandler(async (req, res) => {
  const { parentUser, id, patches } = req.body;
  // Confirm data (parentUser and name required)
  if (!parentUser || !id) return res.status(400).json({ message: 'parentUser and split id fields are required' });

  // get split to patch
  const split = await Split.findOne({ parentUser, _id: id }).exec();
  if (!split) return res.status(400).json({ message: `No split found` });

  for (let patch of patches) {
    const { path, op, value } = patch;
    // do not allow patching of immutable fields
    if (path in SplitSchemaFields === false || path === '_id' || path === 'parentUser')
      return res.status(400).json({ message: `Invalid patch path` });

    const { result, error } = await patchSplit(split, parentUser, op, path, value);
    if (error) return res.status(400).json({ message: error });
    split[path] = result;

    // save per split to preserve consistency with templates if error happens
  }
  await split.save();
  res.json({ message: `Successfully patched ${split.name}` });
});

// @desc Delete an split
// @route DELETE /splits
// @access Private
const deleteSplit = asyncHandler(async (req, res) => {
  const { parentUser, id } = req.body;
  // Confirm data (parentUser and name required)
  if (!parentUser || !id) return res.status(400).json({ message: 'parentUser and split id fields are required' });
  // get split to patch
  const split = await Split.findOne({ parentUser, _id: id }).exec();
  if (!split) return res.status(400).json({ message: `No split found` });

  const { deletedCount } = await Split.deleteOne();
  if (deletedCount !== 1) return res.status(400).json({ message: `Split could not be deleted` });
  res.json({ message: `Split ${split.name} deleted` });
});

async function patchSplit(split, parentUser, op, path, value) {
  const isArray = Array.isArray(split[path]);
  switch (op) {
    case 'add':
      // validation: add operation must add to an iterable
      if (!isArray) return { error: `Invalid patch path, must be an array` };
      else {
        const templateId = await Template.findOne({ parentUser, _id: value }).select('_id').exec();
        if (!templateId) return { error: `Invalid patch value, template not found` };
        split[path].push(templateId);
      }
      break;

    case 'remove':
      // validation: remove operation must add to an iterable
      if (!isArray) return { error: `Invalid patch path, must be an array` };
      else {
        const templateId = await Template.findOne({ parentUser, _id: value }).select('_id').exec();
        if (!templateId) return { error: `Invalid patch value, template not found` };
        const templateIndex = split[path].indexOf(new ObjectId(templateId));
        if (templateIndex == -1) return { error: `Invalid patch value, value is not an template` };
        split[path].splice(templateIndex, 1);
      }
      break;

    // replace operation for name, description
    case 'replace':
      // validation: replace operation cannot be used on iterable and value must be string
      if (isArray) return { error: `Invalid patch path, cannot replace an array` };
      if (typeof value !== 'string') return { error: `Invalid patch value, must be a string` };
      split[path] = value;
      break;
    default:
      return { error: `Invalid patch operation` };
  }
  return { result: split[path] };
}

export default {
  getSplit,
  createNewSplit,
  updateSplit,
  deleteSplit
};
