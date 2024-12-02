'use client'

import { BlogCategory } from "@prisma/client"
import { useCategory } from "../../hooks/useCategory"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import InputField from "@/components/InputField"
import SuperButton from "@/app/(dashboard)/_components/SuperButton"


type Props = {
  category?:BlogCategory
}

const CategoryForm = ({category}: Props) => {
  const {form,onSubmit} = useCategory(category)
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     <InputField form={form} label="Category Title" name="title" placeholder="Enter Category Title"  />
      <SuperButton variant="site" className="w-full" type="submit" buttonType="loadingButton"  loading={form.formState.isSubmitting} title={category ? "Update" : "Create"} />
    </form>
  </Form>
)
 
}

export default CategoryForm