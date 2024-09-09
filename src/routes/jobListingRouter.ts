import express from 'express';
import { createJobListing, getJobListing, getJobListings, updateJobListing, deleteJobListing, applyToJob } from '../controllers';
import { isAuthenticated, isOwner, validateData } from '../middlewares';
import { createJobListingSchema, updateJobListingSchema } from '../schemas';

export default (router: express.Router) => {
    /**
     * @openapi
     * '/api/v1/jobListings':
     *   get:
     *     tags:
     *       - Job Listings
     *     description: Fetches all job listings
     *     responses:
     *       200:
     *         description: Job listings fetched
     *       500:
     *         description: Internal server error
     */
    router.get('/jobListings', isAuthenticated, getJobListings);

    /**
     * @openapi
     * '/api/v1/jobListings/{id}':
     *   get:
     *     tags:
     *       - Job Listings
     *     description: Fetches job listing details
     *     responses:
     *       200:
     *         description: Job listing details fetched
     *       404:
     *         description: Job listing not found
     *       500:
     *         description: Internal server error
     */
    router.get('/jobListings/:id', isAuthenticated, getJobListing);

    /**
     * @openapi
     * '/api/v1/jobListings':
     *   post:
     *     tags:
     *       - Job Listings
     *     description: Creates a new job listing
     *     responses:
     *       201:
     *         description: Job listing created
     *       500:
     *         description: Internal server error
     */
    router.post('/jobListings', isAuthenticated, validateData(createJobListingSchema), createJobListing);

    /**
     * @openapi
     * '/api/v1/jobListings/{id}':
     *   put:
     *     tags:
     *       - Job Listings
     *     description: Updates job listing details
     *     responses:
     *       200:
     *         description: Job listing details updated
     *       404:
     *         description: Job listing not found
     *       500:
     *         description: Internal server error
     */
    router.put('/jobListings/:id', isAuthenticated, validateData(updateJobListingSchema), isOwner, updateJobListing);

    /**
     * @openapi
     * '/api/v1/jobListings/{id}':
     *   delete:
     *     tags:
     *       - Job Listings
     *     description: Deletes job listing
     *     responses:
     *       200:
     *         description: Job listing deleted
     *       404:
     *         description: Job listing not found
     *       500:
     *         description: Internal server error
     */
    router.delete('/jobListings/:id', isAuthenticated, isOwner, deleteJobListing);

    /**
     * @openapi
     * '/api/v1/jobListings/{id}/apply':
     *   post:
     *     tags:
     *       - Job Listings
     *     description: Apply to job listing
     *     responses:
     *       200:
     *         description: Job listing applied
     *       404:
     *         description: Job listing not found
     *       500:
     *         description: Internal server error
     */
    router.post('/jobListings/:id/apply', isAuthenticated, applyToJob);
}