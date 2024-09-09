import { z } from "zod";

export const userRegistrationSchema = z.object({
    username: z.string().min(3).max(255),
    name: z.string().min(3).max(255),
    password: z.string().min(8).max(16),
    githubLink: z.string().url(),
    points: z.number().int().default(0),
});

export const userLoginSchema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(8).max(16),
});

export const userUpdateSchema = z.object({
    name: z.string().min(3).max(255),
    githubLink: z.string().url(),
})