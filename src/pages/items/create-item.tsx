import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { authApi } from "@/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import CategorySelect from "../../components/select-category";
import FullScreenLoading from "@/components/fullscreen-loading";
import { fetchItemCategories } from "./item-service";

const itemFormSchema = z.object({
  name: z.string().min(1, { message: "Necessary" }),
  user: z.number(),
  description: z.string().min(1, { message: "Necessary" }),
  price: z.string().min(1, { message: "Necessary" }),
  category: z.string().min(1, { message: "Necessary" }),
  image_url: z
    .custom<File>((v) => v instanceof File, {
      message: "Image is required",
    })
    .nullable(),
});

export function CreateItem() {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["event-categories"],
    queryFn: () => fetchItemCategories(),
  });

  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
      user: user!.id,
      description: "",
      image_url: null,
      category: "",
      price: "",
    },
  });

  async function onSubmit(values: z.infer<typeof itemFormSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("user", "" + values.user);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    if (values.image_url) formData.append("image_url", values.image_url);

    try {
      await authApi.post("api/item/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      toast.success("Item created successfully");
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Item creation failed", { description: "Please try again" });
      form.setError("name", { message: "There was an error at some field" });
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter short title for your item" {...field} />
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
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
            <FormField
              control={form.control}
              name="image_url"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        //@ts-ignore
                        onChange(event.target.files[0]);
                      }}
                    />
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
