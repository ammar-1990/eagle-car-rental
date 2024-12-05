'use client'
import { Blog } from "@prisma/client";
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { blogSchema } from "../schemas";
import { z } from "zod";
export const useBlog = (blog:Blog | null)=>{
    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
          title:blog?.title ?? '',
          content:blog?.content ?? '',
          categoryId:blog?.categoryId ?? '',
          slug:blog?.slug ??'',
          featuredImage:blog?.featuredImage ??''
        },
      })

      function onSubmit(values: z.infer<typeof blogSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }


      return {form, onSubmit}

}