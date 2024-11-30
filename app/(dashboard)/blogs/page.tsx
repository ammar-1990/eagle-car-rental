import { wait } from "@/lib/utils";
import React, { Suspense } from "react";
import Heading from "../_components/Heading";
import CategoriesFeed from "./_components/CategoriesFeed";
import BlogsFeed from "./_components/BlogsFeed";
import { Skeleton } from "@/components/ui/skeleton";
import ModalButton from "../_components/SuperButton";
 
import SuperButton from "../_components/SuperButton";

type Props = {};

const BlogsPage = async (props: Props) => {
  return (
    <div>
      <Heading title="Blogs" />

      {/* categories feed */}
      <div className="mt-[80px]">
        <div className="flex items-center gap-8 justify-between">
          <Heading title="Categories" className="text-md" />
          <SuperButton
            buttonType="modalButton"
            title="Create Category"
            modalInputs={{ modal: "category" }}
          />
        </div>
        <Suspense
          fallback={
            <Skeleton className="h-[100px] w-full mt-2 bg-muted-foreground" />
          }
        >
          <CategoriesFeed />
        </Suspense>
      </div>

      {/* blogs feed*/}
      <div className="mt-[80px]">
        <div className="flex items-center gap-8 justify-between">
          <Heading title="Blogs" className="text-md" />
          <SuperButton buttonType="linkButton" title="Create Blog" href="/blogs/new" />
        </div>

        <Suspense
          fallback={
            <Skeleton className="h-[200px] w-full mt-2 bg-muted-foreground" />
          }
        >
          <BlogsFeed />
        </Suspense>
      </div>
    </div>
  );
};

export default BlogsPage;
