"use client";

import { FC, useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

import type { ShadcnFormProps, ShadcnFormField } from "./types";
import { Button } from "@/components/ui/button";

const ShadcnForm: FC<ShadcnFormProps> = ({ fields, onSubmit, footer }) => {
  const [defaultValues, setDefaultValues] = useState<Record<string, any>>({});

  useEffect(() => {
    fields.forEach((field) => {
      setDefaultValues((prev) => ({
        ...prev,
        [field.name]: field.defaultValue,
      }));
    });
  }, [fields]);

  const form = useForm({ defaultValues });
  return (
    <Form {...form}>
      <form>
        {fields.map((field: ShadcnFormField) => (
          <FormField
            key={field.name}
            name={field.name}
            control={form.control}
            render={(v) => (
              <FormItem className="flex flex-col">
                <div className="flex items-center">
                  <FormLabel className="w-[100px]">
                    {field.required && (
                      <span className="text-red-500 mr-0.5">*</span>
                    )}
                    {field.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...v}
                      placeholder={field.placeholder}
                      readOnly={field.readOnly}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        ))}
      </form>
      {typeof footer === "boolean" ? (
        <>
          {footer && (
            <>
              <Button variant={"default"} onClick={form.handleSubmit(onSubmit)}>
                提交
              </Button>
            </>
          )}
        </>
      ) : (
        footer
      )}
    </Form>
  );
};

export default ShadcnForm;
