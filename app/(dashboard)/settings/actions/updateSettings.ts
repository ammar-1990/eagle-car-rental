"use server";

import { z } from "zod";
import { settingsSchema } from "../schemas";
import CustomError from "@/lib/CustomError";
import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import prisma from "@/lib/prisma";

export const updateSettings = async (
  settings: z.infer<typeof settingsSchema>
): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session) return throwCustomError("Unauthorized");

    const validData = settingsSchema.safeParse(settings);
    if (!validData.success) return throwCustomError("Input Error");

    const {oldPassword, ...rest} = validData.data

    const existSettings =  await prisma.settings.findUnique({
      where:{
          id:'settings'
      }})

      if(existSettings){
        if(oldPassword !==existSettings.password) return throwCustomError('Old Password Is Not Correct')
      }

    await prisma.settings.upsert({
        where:{
            id:'settings'
        },
        create:{
           ...rest
        },
        update:{
          ...rest
        }

    })

    return {success:true,message:'Settings Successfully Updated'}
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return { success: false, message: "Internal Server Error" };
  }
};
