
import { useModal } from "@/app/zustand";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Heading from "../../../_components/Heading";
import { useCategory } from "../../hooks/useCategory";
import {
  Form,
} from "@/components/ui/form";
import InputField from "@/components/InputField";
import SuperButton from "@/app/(dashboard)/_components/SuperButton";
import { useState } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(()=>import('@/components/Editor'),{ssr:false})

type Props = {};

const CategoryModal = (props: Props) => {
  const { open, setClose, modalInputs } = useModal();
  const isOpen = open && modalInputs?.modal === "category";
  const category = modalInputs?.modal === "category" ?  modalInputs.data : undefined;
  const { form, onSubmit } = useCategory(category);
  const title = category ? `Update ${category.title}` : "Create Blog Category";

  return (
    <Dialog open={isOpen} onOpenChange={()=>{
      if(form.formState.isSubmitting) return
      setClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Heading title="Blog Category" />
          </DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
 
            <InputField
              form={form}
              label="Category Title"
              name="title"
              placeholder="Enter Category Title"
            />
            <SuperButton
              variant="site"
              className="w-full"
              type="submit"
              buttonType="loadingButton"
              loading={form.formState.isSubmitting}
              title={category ? "Update" : "Create"}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
