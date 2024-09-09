import express from 'express';
import { getUser, getUsers, updateUser, deleteUser, userBasedOnPoints, likeUser } from '../controllers';
import { isUser, isAuthenticated, validateData } from '../middlewares';
import { userUpdateSchema } from '../schemas';

export default (router: express.Router) => {
    /**
     * @openapi
     * '/api/v1/users':
     *   get:
     *     tags:
     *       - Users
     *     description: Fetches all users
     *     responses:
     *       200:
     *         description: Users fetched
     *       500:
     *         description: Internal server error
     */
    router.get('/users', getUsers);

    /**
     * @openapi
     * '/api/v1/users/{id}':
     *   get:
     *     tags:
     *       - Users
     *     description: Fetches user details
     *     responses:
     *       200:
     *         description: User details fetched
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    router.get('/users/:id', getUser);

    /**
     * @openapi
     * '/api/v1/users/{id}':
     *   put:
     *     tags:
     *       - Users
     *     description: Updates user details
     *     responses:
     *       200:
     *         description: User details updated
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    router.put('/users/:id', isAuthenticated, validateData(userUpdateSchema), isUser, updateUser);

    /**
     * @openapi
     * '/api/v1/users/{id}':
     *   delete:
     *     tags:
     *       - Users
     *     description: Deletes user
     *     responses:
     *       200:
     *         description: User deleted
     *       404:
     *         description: User not found
     *       500:
     *         description: Internal server error
     */
    router.delete('/users/:id', isAuthenticated, isUser, deleteUser);

    /**
     * @openapi
     * '/api/v1/users/list':
     *   get:
     *     tags:
     *       - Users
     *     description: Fetches users based on points
     *     responses:
     *       200:
     *         description: Users fetched based on points
     *       500:
     *         description: Internal server error
     */
    router.get('/users/list', isAuthenticated, userBasedOnPoints);

    /**
     * @openapi
     * '/api/v1/users/like':
     *   post:
     *     tags:
     *       - Users
     *     description: Like a user
     *     responses:
     *       200:
     *         description: User liked
     *       500:
     *         description: Internal server error
     */
    router.post('/users/like', isAuthenticated, likeUser);
}