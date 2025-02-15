import asyncHandler from "express-async-handler";
import { HTTP_STATUS } from "data";

// Type imports
import { Response, RequestHandler } from "express";

// Helper Functions
import { verifyToken } from "utils";

// Error handlers
import { UnauthenticatedError } from "errors";
import { User } from "models";

const sendNoAuth = (response: Response, msg: string) => {
  response.status(HTTP_STATUS.UNAUTHORIZED);
  throw new UnauthenticatedError(msg);
};

export const protectRoute: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      sendNoAuth(res, "Authentication failed");
    }

    if (authHeader && authHeader.startsWith("Bearer")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
          sendNoAuth(res, "Authentication failed");
          return;
        }

        req.user = user;
        next();
      } catch (err) {
        sendNoAuth(res, "Authentication failed");
      }
    } else {
      sendNoAuth(res, "Not authorized, please try again or login.");
    }
  }
);
