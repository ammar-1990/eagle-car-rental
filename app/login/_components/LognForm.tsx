"use client";

import { useLogin } from "../hooks/useLogin";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";
import Image from "next/image";
import { Loader } from "lucide-react";

type Props = {};

const LognForm = (props: Props) => {
  const { form, onSubmit,pending } = useLogin();
  return (
    <div className="flex flex-col p-12 border rounded-md w-[350px] ">
      <div className="px-12 mb-8 bg-site-primary rounded-md">
        <div className="relative w-[200px] mx-auto aspect-video">
          <Image
            src={"/Logo.png"}
            className="object-contain"
            fill
            alt="login-logo"
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputField
            inputStyles=""
            labelStyles="text-site-primary"
            form={form}
            label="Username"
            name="username"
            placeholder="Username"
            type="text"
          />
          <InputField
            inputStyles=""
            labelStyles="text-site-primary"
            form={form}
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
          />
          <Button
          disabled={pending}
            className="w-full bg-site-primary hover:bg-site-primary/85 disabled:opacity-50 disabled:cursor-default"
            type="submit"
          >
            Submit
            {pending && <Loader className="ml-3 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LognForm;
