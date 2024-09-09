import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger, prisma } from "../utils";

export const createJobListing = async (req: Request, res: Response) => {
    try {
        const { link, title, date } = req.body;

        const jobListing = await prisma.jobListing.findUnique({
            where: {
                link: link
            }
        })

        if (jobListing) {
            logger.info("Job listing already exists");
            res.status(StatusCodes.CONFLICT).json({
                message: "Job listing already exists"
            }).end();
        }

        const newJobListing = await prisma.jobListing.create({
            data: {
                link: link,
                title: title,
                date: date,
                owner: req.user.id
            }
        });

        if (newJobListing) {
            logger.info("Job listing created successfully");
            res.status(StatusCodes.OK).json({
                message: "Job listing created successfully"
            }).end();
        } else {
            logger.error("Error in creating job listing");
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error"
            }).end();
        }

    } catch (err) {
        logger.error(`Error in createJobListing: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}

export const getJobListings = async (req: Request, res: Response) => {
    try {
        const jobListings = await prisma.jobListing.findMany({});

        if (jobListings) {
            logger.info("Job listings fetched");
            res.status(StatusCodes.OK).json({
                jobListings,
                message: "Job listings fetched"
            }).end();
        } else {
            logger.error("Job listings not found");
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Job listings not found"
            }).end();
        }
    } catch (err) {
        logger.error(`Error in getJobListings: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}

export const getJobListing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const jobListing = await prisma.jobListing.findUnique({
            where: {
                id: id
            }
        });

        if (jobListing) {
            logger.info("Job listing fetched");
            res.status(StatusCodes.OK).json({
                jobListing,
                message: "Job listing fetched"
            }).end();
        } else {
            logger.error("Job listing not found");
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Job listing not found"
            }).end();
        }
    } catch (err) {
        logger.error(`Error in getJobListing: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}

export const deleteJobListing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const jobListing = await prisma.jobListing.delete({
            where: {
                id: id
            }
        })

        if (jobListing) {
            logger.info("Job listing deleted");
            res.status(StatusCodes.OK).json({
                message: "Job listing deleted"
            }).end();
        } else {
            logger.error("Job listing not found");
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Job listing not found"
            }).end();
        }
    } catch (err) {
        logger.error(`Error in deleteJobListing: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}

export const updateJobListing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { link, title, date } = req.body;

        const jobListing = await prisma.jobListing.update({
            where: {
                id: id
            },
            data: {
                link: link,
                title: title,
                date: date
            }
        });

        if (jobListing) {
            logger.info("Job listing updated");
            res.status(StatusCodes.OK).json({
                message: "Job listing updated"
            }).end();
        } else {
            logger.error("Job listing not found");
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Job listing not found"
            }).end();
        }
    } catch (err) {
        logger.error(`Error in updateJobListing: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}

export const applyToJob = async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params;

        const jobListing = await prisma.jobListing.findUnique({
            where: {
                id: jobId
            }
        });

        if (!jobListing) {
            logger.info("Job listing not found");
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Job listing not found"
            }).end();
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });

        if (!user) {
            logger.info("User not found");
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found"
            }).end();
            return;
        }

        const appliedJob = await prisma.jobListing.update({
            where: {
                id: jobId
            }, data: {
                applicants: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        if (appliedJob) {
            logger.info("Applied to job");
            res.status(StatusCodes.OK).json({
                message: "Applied to job"
            }).end();
        } else {
            logger.error("Error in applying to job");
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error"
            }).end();
        }
    } catch (err) {
        logger.error(`Error in applyToJob: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}
