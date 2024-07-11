import Exercise from '../models/Exercise.js';
import Template from '../models/Template.js';
import Split from '../models/Split.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

const TemplateSchemaFields = Object.freeze({
  _id: Symbol('_id'),
  parentUser: Symbol('parentUser'),
  name: Symbol('name'),
  description: Symbol('description'),
  exercises: Symbol('exercises')
});

// @desc Get all templates
// @route GET /templates
// @access Private
const getTemplate = asyncHandler(async (req, res) => {
  const { parentUser } = req.query; // extract key/value pair of 'name' key from query string
  if (!parentUser) return res.status(400).json({ message: 'parentUser field required' });

  // check if all fields of query are valid
  for (let field in req.query) {
    if (field in TemplateSchemaFields === false)
      return res.status(400).json({ message: `Invalid query field '${field}'` });
  }

  // populate activities with exercise names
  const templates = await Template.find(req.query).lean().exec();

  if (!templates?.length) {
    return res.status(400).json({ message: `No templates found` });
  }

  res.json(templates);
});

// @desc Create new template
// @route POST /templates
// @access Private
const createNewTemplate = asyncHandler(async (req, res) => {
  const { parentUser, exercises } = req.body;
  // Confirm data (parentUser and name required)
  if (!parentUser || !Array.isArray(exercises) || exercises.length === 0) {
    return res.status(400).json({ message: 'parentUser and exercises array are required' });
  }
  // check if all fields of body are valid
  for (let field in req.body) {
    if (field in TemplateSchemaFields === false)
      return res.status(400).json({ message: `Invalid input field '${field}'` });
  }

  // convert exercises of request body into attempt schema
  let exerciseIds = await Promise.all(
    exercises.map(async (exercise) => Exercise.findOne({ parentUser, name: exercise }).select('_id').exec())
  );
  exerciseIds = exerciseIds.filter((e) => e);
  // create and store new template document
  const template = new Template({
    ...req.body,
    exercises: exerciseIds
  });
  try {
    await template.save();
    res.status(201).json({ message: `New template ${template.name} created` });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: `Invalid template data received: ${err}` });
  }
});

// @desc Update an template
// @route PATCH /templates
// @access Private
const updateTemplate = asyncHandler(async (req, res) => {
  const { parentUser, id, patches } = req.body;
  // Confirm data (parentUser and name required)
  if (!parentUser || !id) return res.status(400).json({ message: 'parentUser and template id fields are required' });

  // get template to patch
  const template = await Template.findOne({ parentUser, _id: id }).exec();
  if (!template) return res.status(400).json({ message: `No template found` });

  for (let patch of patches) {
    const { path, op, value } = patch;
    // do not allow patching of immutable fields
    if (path in TemplateSchemaFields === false || path === '_id' || path === 'parentUser')
      return res.status(400).json({ message: `Invalid patch path` });

    const { result, error } = await patchTemplate(template, parentUser, op, path, value);
    if (error) return res.status(400).json({ message: error });
    template[path] = result;

    // save per template to preserve consistency with exercises if error happens
  }
  await template.save();
  res.json({ message: `Successfully patched ${template.name}` });
});

// @desc Delete an template
// @route DELETE /templates
// @access Private
const deleteTemplate = asyncHandler(async (req, res) => {
  const { parentUser, id } = req.body;
  // Confirm data (parentUser and name required)
  if (!parentUser || !id) return res.status(400).json({ message: 'parentUser and template id fields are required' });
  // get template to patch
  const template = await Template.findOne({ parentUser, _id: id }).exec();
  if (!template) return res.status(400).json({ message: `No template found` });

  Split.update({ templates: id }, { $pull: { templates: id } }, { multi: true }).exec();

  const { deletedCount } = await Template.deleteOne();
  if (deletedCount !== 1) return res.status(400).json({ message: `Template could not be deleted` });
  res.json({ message: `Template ${template.name} deleted` });
});

async function patchTemplate(template, parentUser, op, path, value) {
  const isArray = Array.isArray(template[path]);
  switch (op) {
    case 'add':
      // validation: add operation must add to an iterable
      if (!isArray) return { error: `Invalid patch path, must be an array` };
      else {
        const exerciseId = await Exercise.findOne({ parentUser, name: value }).select('_id').exec();
        if (!exerciseId) return { error: `Invalid patch value, exercise not found` };
        template[path].push(exerciseId);
      }
      break;

    case 'remove':
      // validation: remove operation must add to an iterable
      if (!isArray) return { error: `Invalid patch path, must be an array` };
      else {
        const exerciseId = await Exercise.findOne({ parentUser, name: value }).select('_id').exec();
        if (!exerciseId) return { error: `Invalid patch value, exercise not found` };
        const exerciseIndex = template[path].indexOf(new ObjectId(exerciseId));
        if (exerciseIndex == -1) return { error: `Invalid patch value, value is not an exercise` };
        template[path].splice(exerciseIndex, 1);
      }
      break;

    // replace operation for name, description
    case 'replace':
      // validation: replace operation cannot be used on iterable and value must be string
      if (isArray) return { error: `Invalid patch path, cannot replace an array` };
      if (typeof value !== 'string') return { error: `Invalid patch value, must be a string` };
      template[path] = value;
      break;
    default:
      return { error: `Invalid patch operation` };
  }
  return { result: template[path] };
}

export default {
  getTemplate,
  createNewTemplate,
  updateTemplate,
  deleteTemplate
};
