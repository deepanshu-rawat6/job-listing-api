import { z } from 'zod';

export const createJobListingSchema = z.object({
    link: z.string().url(),
    title: z.string().min(3).max(255),
    date: z.date()
})

export const updateJobListingSchema = z.object({
    link: z.string().url(),
    title: z.string().min(3).max(255),
    date: z.date()
})