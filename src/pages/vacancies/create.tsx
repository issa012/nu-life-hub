import { authApi } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";
import CategorySelect from "../../components/select-category";
import { useQuery } from "@tanstack/react-query";

import FullScreenLoading from "@/components/fullscreen-loading";
import { fetchJobCategories } from "./job-service";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const jobFormSchema = z.object({
  name: z.string().min(1, { message: "Please fill out this field" }),
  user: z.number(),
  description: z.string().min(1, { message: "Please fill out this field" }),
  category: z.string().min(1, { message: "Please fill out this field" }),
});

export function CreateVacancy() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["job-categories"],
    queryFn: () => fetchJobCategories(),
  });

  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      name: "",
      user: user?.id,
      description: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof jobFormSchema>) {
    try {
      await authApi.post("api/item/", values);
      setOpen(false);
      toast.success("Item created successfully");
    } catch (error) {
      toast.error("Item creation failed", { description: "Please try again" });
      form.setError("name", { message: "error" });
    }
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
