import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import CategorySelect from "../../components/select-category";

import FullScreenLoading from "@/components/fullscreen-loading";
import { createVacancy, fetchJobCategories } from "./job-service";
import { useAuth } from "@/hooks/useAuth";

const VacancyFormSchema = z.object({
  name: z.string().min(1, { message: "Please fill out this field" }),
  user: z.number(),
  description: z.string().min(1, { message: "Please fill out this field" }),
  category: z.string().min(1, { message: "Please fill out this field" }),
});

export type IVacancyForm = z.infer<typeof VacancyFormSchema>;

export function CreateVacancy() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createVacancy,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["vacancy"] });
      toast.success("Item created successfully");
      form.reset();
    },
    onError: () => {
      toast.error("Item creation failed", { description: "Please try again" });
      form.setError("root.serverError", { message: "Server error occured. Please try again" });
    },
  });
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["job-categories"],
    queryFn: () => fetchJobCategories(),
  });

  const form = useForm<IVacancyForm>({
    resolver: zodResolver(VacancyFormSchema),
    defaultValues: {
      name: "",
      user: user?.id,
      description: "",
      category: "",
    },
  });

  async function onSubmit(values: IVacancyForm) {
    mutate(values);
  }

  if (categoriesLoading) return <FullScreenLoading />;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create marketplace item</DialogTitle>
          <DialogDescription>Enter all information below to create an item</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Frontend developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <CategorySelect
                        categories={categories}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your descripton" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create item</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
