// Imports
import asyncHandler from "express-async-handler";
import { HTTP_STATUS } from "data";
import _ from "lodash";
import { generateToken } from "utils";

// Database
import { Group, User } from "models";

// Error handlers
import { BadRequestError, UnauthenticatedError } from "errors";

// Managing groups

// @description   Get all groups
// @route         GET /api/group
// @access        Private
export const getAll = asyncHandler(async (req, res) => {
  const user = req.user!;

  const groups = await Group.find({ users: { $in: [user.id] } });

  res.status(HTTP_STATUS.OK).json({ groups });
});

// @description   Create group
// @route         POST /api/group
// @access        Private
export const create = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new BadRequestError("Name is not provided");
    }

    const user = req.user!;

    const newGroup = await Group.create({
      name,
      expenses: [],
      status: "£0.00",
      users: [user.id],
    });

    !user.groups.includes(newGroup.id) && user.groups.push(newGroup.id);

    await user.save();

    res.status(HTTP_STATUS.OK).json({
      group: newGroup.toObject(),
      token: generateToken(user.id),
    });
  } catch (error) {
    next(error);
  }
});

// @description   Delete group
// @route         DELETE /api/group/:id
// @access        Private
export const remove = asyncHandler(async (req, res, next) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);

    if (!group) {
      res.status(HTTP_STATUS.BAD);
      throw new BadRequestError(`Group not found`);
    }

    res
      .status(HTTP_STATUS.OK)
      .json(`Group with id ${group.id} has been deleted`);
  } catch (error) {
    next(error);
  }
});
