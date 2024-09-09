import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils";
import { logoutUser, registerUser, loginUser } from "../controllers";
import { isAuthenticated, validateData } from "../middlewares";
import { userRegistrationSchema, userLoginSchema } from "../schemas";

export default (router: express.Router) => {
    /**
     * @openapi
     * '/api/v1/logout':
     *   get:
     *     tags:
     *       - Authentication
     *     description: User is logged out
     *     responses:
     *       200:
     *         description: User is logged out
     *       500:
     *         description: Internal server error
     */
    router.get("/logout", isAuthenticated, logoutUser);


    /**
     * @openapi
     * '/api/v1/auth/registerUser':
     *   post:
     *     tags:
     *       - Authentication
     *     description: Registers user with email id and password
     *     responses:
     *       200:
     *         description: User successfully registered
     *       401:
     *         description: Invalid credentials
     *       500:
     *         description: Internal server error 
     */
    router.post("/auth/registerUser", validateData(userRegistrationSchema), registerUser);


    /**
     * @openapi
     * '/api/v1/auth/loginUser':
     *   post:
     *     tags:
     *       - Authentication
     *     description: Logs in user with email id and password
     *     responses:
     *       200:
     *         description: User successfully logged in
     *       401:
     *         description: Invalid credentials
     *       500:
     *         description: Internal server error
     */
    router.post("/auth/loginUser", validateData(userLoginSchema), loginUser);

    /**
     * @openapi
     * '/api/v1/auth/session':
     *   get:
     *     tags:
     *       - Session
     *     description: Give session details
     *     responses:
     *       200:
     *         description: User successfully logged in
     *       500:
     *         description: Internal server error
     */
    router.get('/auth/session', isAuthenticated);
}