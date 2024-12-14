import { wait } from "@/lib/utils";
import React, { Suspense } from "react";
import Heading from "../_components/Heading";
import CategoriesFeed from "./_components/feeds/CategoriesFeed";
import BlogsFeed from "./_components/feeds/BlogsFeed";
import { Skeleton } from "@/components/ui/skeleton";
import ModalButton from "../../../components/SuperButton";

import SuperButton from "../../../components/SuperButton";
import { PlusCircle } from "lucide-react";

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
            title="Category"
            Icon={<PlusCircle className="icon" />}
            modalInputs={{ modal: "category", data: undefined }}
          />
        </div>
        <Suspense
          fallback={
            <Skeleton className="h-[200px] w-full mt-2 bg-muted-foreground" />
          }
        >
          <CategoriesFeed />
        </Suspense>
      </div>

      {/* blogs feed*/}
      <div className="mt-[80px]">
        <div className="flex items-center gap-8 justify-between">
          <Heading title="Blogs" className="text-md" />
          <SuperButton
            buttonType="linkButton"
            title="Blog"
            href="/blogs/new"
            Icon={<PlusCircle className="icon" />}
          />
        </div>
        <div className="mt-2">
          <Suspense
            fallback={
              <Skeleton className="h-[200px] w-full mt-2 bg-muted-foreground" />
            }
          >
            <BlogsFeed />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
