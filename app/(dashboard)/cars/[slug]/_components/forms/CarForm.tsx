"use client";

import { Car, CarType } from "@prisma/client";
import { useCar } from "../../hooks/useCar";
import { ExtraOptionsType } from "../../schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SuperButton from "@/components/SuperButton";
import { Loader2, Plus, Trash } from "lucide-react";
import FormWrapper from "@/components/FormWrapper";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import {
  FUEL,
  FUEL_CONST,
  FUEL_MAP,
  LOCATIONS,
  LOCATIONS_CONST,
  LOCATIONS_MAP,
  SEATS,
  SEATS_CONST,
  SEATS_MAP,
} from "@/lib/Types";
import { useImageUpload } from "@/app/hooks/imageUpload";
import { SingleImageUploadField } from "@/components/SingleImageUploadField";
import Heading from "@/app/(dashboard)/_components/Heading";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";

type Props = {
  car: Car | null;
  carTypes: CarType[];
  extraOptions: ExtraOptionsType[];
};

const CarForm = ({ car, carTypes, extraOptions }: Props) => {
  const { form, onSubmit, pending } = useCar(
    car,
    extraOptions
  );
  const { file, setFile, uploadImage, ImagePlaceholder, isDisabled } =
    useImageUpload({
      form,
      fieldName: "image",
    });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "extraOptions", // The name of your array in the form schema
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Car Information */}
        <FormWrapper title="Car Information">
          <InputField
            form={form}
            name="subTitle"
            label="Car Name"
            placeholder="Enter Car Name"
            inputStyles="max-w-[357px]"
          />
          <InputField
            form={form}
            name="slug"
            label="Car Slug"
            placeholder="Enter Car Slug"
            inputStyles="max-w-[357px]"
          />
          <SelectField
            inputStyles="max-w-[357px]"
            form={form}
            label="Car Type"
            name="carTypeId"
            placeholder="Choose Car Type"
            values={carTypes}
            renderItem={(value) => ({ label: value.title, value: value.id })}
          />
          <SelectField
            inputStyles="max-w-[357px]"
            form={form}
            label="Seats"
            name="seats"
            placeholder="Choose Seats Number"
            values={SEATS}
            renderItem={(value) => ({
              label: SEATS_MAP[value as (typeof SEATS_CONST)[number]],
              value: String(value),
            })}
          />
          <SelectField
            inputStyles="max-w-[357px] capitalize"
            optionStyles="capitalize"
            form={form}
            label="Fuel"
            name="fuel"
            placeholder="Choose Fuel Type"
            values={FUEL}
            renderItem={(value: string) => ({
              label: FUEL_MAP[value as (typeof FUEL_CONST)[number]],
              value: value,
            })}
          />
          <SelectField
            inputStyles="max-w-[357px] capitalize"
            optionStyles="capitalize"
            form={form}
            label="Location"
            name="location"
            placeholder="Choose Location"
            values={LOCATIONS}
            renderItem={(value: string) => ({
              label: LOCATIONS_MAP[value as (typeof LOCATIONS_CONST)[number]],
              value: value,
            })}
          />
        </FormWrapper>

        {/* Appearance */}
        <FormWrapper title="Appearance">
          <SingleImageUploadField
            form={form}
            name="image"
            file={file}
            setFile={(file: File | undefined) => setFile(file)}
            uploadImage={uploadImage}
            isDisabled={isDisabled}
            ImagePlaceholder={<ImagePlaceholder />}
          />
        </FormWrapper>

        {/* Pricing */}
        <FormWrapper title="Pricing">
          <FormField
            control={form.control}
            name="pricing"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* Hours */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <InputField
                      form={form}
                      name="pricing.hour"
                      label="Hour Price"
                      inputStyles="capitalize"
                      placeholder="Enter Hour Price"
                    />
                    {/* Days */}
                    <div className="flex flex-col gap-2">
                      {form.watch("pricing.days").map((_, index) => {
                        const day = index + 1;
                        const placeholder = `${day} Day${day >= 2 ? "s" : ""}`;
                        return (
                          <InputField
                            key={`Day-${index}`}
                            label={placeholder}
                            form={form}
                            name={`pricing.days.${index}`}
                            placeholder={`Enter Price for ${placeholder}`}
                          />
                        );
                      })}
                    </div>
                    {/* Weeks */}
                    <div className="flex flex-col gap-2">
                      {form.watch("pricing.weeks").map((_, index) => {
                        const week = index + 1;
                        const placeholder = `${week} Week${
                          week >= 2 ? "s" : ""
                        }`;
                        return (
                          <InputField
                            key={`Day-${index}`}
                            label={placeholder}
                            form={form}
                            name={`pricing.weeks.${index}`}
                            placeholder={`Enter Price for ${placeholder}`}
                          />
                        );
                      })}
                    </div>
                    {/* Months */}
                    <div className="flex flex-col gap-2">
                      {form.watch("pricing.months").map((_, index) => {
                        const month = index + 1;
                        const placeholder = `${month} Month${
                          month >= 2 ? "s" : ""
                        }`;
                        return (
                          <InputField
                            key={`Day-${index}`}
                            label={placeholder}
                            form={form}
                            name={`pricing.months.${index}`}
                            placeholder={`Enter Price for ${placeholder}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </FormWrapper>

        {/* Rental Details */}
        <FormWrapper title="Rental Details">
          <InputField
            form={form}
            name={`kmIncluded`}
            inputStyles="max-w-[357px]"
            label={"KM Included / Per Day"}
            placeholder={`Add KM Included Per Day`}
          />
          <InputField
            form={form}
            name={`minimumRentalHouds`}
            inputStyles="max-w-[357px]"
            label={"Minimum Rental Hours"}
            placeholder={`Add Minimum Rental Hours`}
          />
          <InputField
            form={form}
            name={`deposit`}
            inputStyles="max-w-[357px]"
            label={"Deposit"}
            placeholder={`Add Deposit`}
          />
     
        </FormWrapper>

        {/* Extra Options */}
        <FormWrapper title="Extra Options">
          <FormField
            control={form.control}
            name="extraOptions"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full flex flex-col gap-3">
                    {fields.map((item, index) => (
                      <div className="flex items-end gap-2" key={item.id}>
                        <InputField
                          form={form}
                          name={`extraOptions.${index}.title`}
                          inputStyles="w-full"
                          label="Title"
                          placeholder="Add Title"
                        />
                        <InputField
                          form={form}
                          name={`extraOptions.${index}.price`}
                          inputStyles="w-full"
                          label="Price"
                          placeholder="Add Price"
                        />
                        <Button
                          onClick={() => remove(index)}
                          variant="destructive"
                          type="button"
                          size="icon"
                        >
                          <Trash className="icon" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant={"site"}
                      type="button"
                      className="w-fit ml-auto"
                      onClick={()=>append({price:'',title:''})}
                    >
                      <Plus className="icon" /> Add Extra Option
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </FormWrapper>
        {/* Disabled */}
        <FormWrapper title="Disable The Car">

        </FormWrapper>
{/* {JSON.stringify(form.formState.errors)} */}
        <SuperButton
          loading={pending}
          buttonType="loadingButton"
          type="submit"
          variant="site"
          title={car ? "Update" : "Create"}
        />
      </form>
    </Form>
  );
};

export default CarForm;
