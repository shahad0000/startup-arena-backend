import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.service"; // Imports all functions from the auth.service.ts file for use in this controller
import { AppError } from "../utils/error";
import { AuthRequest } from "../middleware/auth.middleware"; // Import custom request type that extends Request with a user field for authenticated users
import { dev } from "../utils/helpers";
import { CREATED, OK } from "../utils/http-status";

// Starts the async signup handler. Uses standard Express middleware signature
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    // Destructures user input from request body
    const { name, email, password, role, age, gender, country, city } = req.body;
    // Calls the signUp service function to register the user and receive tokens
    const { user, accessToken, refreshToken } = await AuthService.signUp({
      name,
      email,
      password,
      role,
      age,
      gender,
      country,
      city
    });

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
      secure: !dev ? true : false,
      sameSite: dev ? "lax" : "none",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: !dev ? true : false,
      sameSite: dev ? "lax" : "none",
    });

    res.status(CREATED).json({
      status: "success",
      data: {
        // Remove password from output
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          age: user.age,
          gender: user.gender,
          country: user.country,
          city: user.city,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    // forwards errors to the global error handler
    next(error);
  }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await AuthService.signIn(
      email,
      password
    );

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
      secure: !dev,
      sameSite: dev ? "lax" : "none",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: !dev,
      sameSite: dev ? "lax" : "none",
    });

    res.status(OK).json({
      status: "success",
      data: {
        // Remove password from output
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          age: user.age,
          gender: user.gender,
          country: user.country,
          city: user.city,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req: Request, res: Response) => {

  // console.log(req.cookies)

  // Clears the tokens by setting them to "none" and expiring them immediately
  res.cookie("accessToken", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.cookie("refreshToken", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(OK).json({
    status: "success",
    message: "Signed out successfully",
  });
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Retrieves the refresh token from cookie or request body 
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      throw new AppError("Refresh token not provided", 401);
    }

    // Calls the service to verify the refresh token and generate new tokens
    const tokens = await AuthService.refreshToken(refreshToken);

    // Set new cookies
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: !dev,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: !dev,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(OK).json({
      status: "success",
      data: tokens,
    });
  } catch (error) {
    next(error);
  }
};

// "AuthRequest" is a Custom request type includes user.id, from the authorized middleware
const deleteAccount = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Calls service to delete the user from the database
    await AuthService.deleteAccount(req.user.id);

    res.cookie("accessToken", "none", {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });
    res.cookie("refreshToken", "none", {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });

    res.status(OK).json({
      status: "success",
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, signOut, refreshToken, deleteAccount };
