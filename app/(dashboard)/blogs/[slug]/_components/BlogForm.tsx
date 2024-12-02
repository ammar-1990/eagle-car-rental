"use client";
import { Blog, BlogCategory } from "@prisma/client";
import React from "react";
import { useBlog } from "../hooks/useBlog";
import { Form } from "@/components/ui/form";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import EditorField from "@/components/EditorField";

type Props = { blog: Blog | null; categories: BlogCategory[] };

const BlogForm = ({ blog, categories }: Props) => {
  const { form, onSubmit } = useBlog(blog);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <SelectField
          form={form}
          label="Blog Category"
          name="categoryId"
          placeholder="Choose Blog Category"
          values={categories}
          renderItem={(value) => ({ label: value.title, value: value.id })}
        />
        <InputField
          form={form}
          label="BLog Slug"
          name="slug"
          placeholder="Enter Blog Slug"
        />
        <InputField
          form={form}
          label="BLog Title"
          name="title"
          placeholder="Enter Blog Title"
        />
        <EditorField 
        form={form}
        label="Blog Content"
        name="content"
        placeholder="Write Blog Content"

        />
      </form>
    </Form>
  );
};

export default BlogForm;
