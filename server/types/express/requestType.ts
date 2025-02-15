import { Request } from "express";
import { UserDocument } from "models/userModel";

// Extend the express Request type to hold an attribute of user.
// This is for when the user ID is passed through auth middleware.
// export interface AuthRequest extends Request {
//   user?: UserDocument;
// }

declare module "express-serve-static-core" {
  interface Request {
    user?: UserDocument; // Ensure it's optional
  }
}
