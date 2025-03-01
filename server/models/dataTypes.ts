// Validator
import validator from "validator";

// Creating objects for model types

export const requiredString = {
  type: String,
  required: true,
};

export const requiredNameString = (options?: {
  min?: number;
  max?: number;
}) => ({
  type: String,
  required: true,
  minlength: options?.min || 2,
  maxlength: options?.max || 20,
  trim: true,
});

export const requiredEmailString = {
  type: String,
  required: true,
  // validate: {
  // 	validator: validator.isEmail,
  // 	message: 'Please provide a valid email address',
  // },
  unique: true,
};

export const requiredPasswordString = {
  type: String,
  required: true,
  minlength: 8,
  select: false,
};
