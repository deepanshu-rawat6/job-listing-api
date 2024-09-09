import { registerUser, loginUser, logoutUser } from "./auth.controller";
import { updateUser, deleteUser, getUser, getUsers, likeUser, userBasedOnPoints } from "./user.controller";
import { createJobListing, deleteJobListing, getJobListing, getJobListings, updateJobListing, applyToJob } from "./jobListing.controller";

export {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    likeUser,
    userBasedOnPoints,
    createJobListing,
    deleteJobListing,
    getJobListing,
    getJobListings,
    updateJobListing,
    applyToJob
}