"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredPasswordString = exports.requiredEmailString = exports.requiredNameString = exports.requiredString = void 0;
// Creating objects for model types
exports.requiredString = {
    type: String,
    required: true,
};
const requiredNameString = (options) => ({
    type: String,
    required: true,
    minlength: (options === null || options === void 0 ? void 0 : options.min) || 2,
    maxlength: (options === null || options === void 0 ? void 0 : options.max) || 20,
    trim: true,
});
exports.requiredNameString = requiredNameString;
exports.requiredEmailString = {
    type: String,
    required: true,
    // validate: {
    // 	validator: validator.isEmail,
    // 	message: 'Please provide a valid email address',
    // },
    unique: true,
};
exports.requiredPasswordString = {
    type: String,
    required: true,
    minlength: 8,
    select: false,
};
