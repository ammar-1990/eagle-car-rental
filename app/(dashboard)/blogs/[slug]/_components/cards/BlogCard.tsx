"use client";
import ImageComponent from "@/components/ImageComponent";
import SuperButton from "@/components/SuperButton";
import { Blog } from "@prisma/client";
import { Delete, Edit } from "lucide-react";
import Link from "next/link";
import React from "react";
import { deleteBlog } from "../../actions/deleteBlog";

type Props = { blog: Blog };

const BlogCard = ({ blog }: Props) => {
  return (
    <article className="p-2 border rounded-md flex flex-col gap-2">
      <ImageComponent
        src={blog.featuredImage}
        alt={"blog-image"}
        aspect="video"
        className="rounded-md overflow-hidden"
      />
      <h2 className="capitalize font-semibold font-lg">{blog.title}</h2>
      <div className="flex gap-2">
        <SuperButton
          className="flex-1"
          buttonType="linkButton"
          href={`blogs/${blog.slug}`}
          title="Update"
          Icon={<Edit className="icon" />}
        />
        <SuperButton
          className="flex-1"
          title="Delete"
          variant="destructive"
          buttonType="modalButton"
          modalInputs={{ modal: "delete", function: () => deleteBlog(blog.id) }}
          Icon={<Delete className="icon" />}
        />
      </div>
    </article>
  );
};

export default BlogCard;
