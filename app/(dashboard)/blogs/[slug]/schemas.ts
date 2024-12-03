import { z } from "zod"
 
export const blogSchema = z.object({
  slug: z.string().min(1,'Required').max(50),
  title:z.string().min(1,'Required').max(50),
  featuredImage: z.string().min(1,'Required'),
  content:z.string().min(1,'Required'),
  categoryId:z.string().min(1)
})