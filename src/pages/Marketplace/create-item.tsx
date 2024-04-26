import { authApi } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { fetchItemCategories } from "./item-service";
import FullScreenLoading from "@/components/fullscreen-loading";

const itemFormSchema = z.object({
  name: z.string().min(1, { message: "Necessary" }),
  user: z.number(),
  description: z.string().min(1, { message: "Necessary" }),
  price: z.string().min(1, { message: "Necessary" }),
  category: z.string().min(1, { message: "Necessary" }),
  image: z.any(),
});

export function CreateItem() {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["event-categories"],
    queryFn: () => fetchItemCategories(),
  });

  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
      user: 1,
      description: "",
      category: "",
      image: "",
      price: "",
    },
  });

  async function onSubmit(values: z.infer<typeof itemFormSchema>, e) {
    console.log("erere");
    const formData = new FormData();

    for (var key in values) {
      formData.append(key, values[key]);
    }
    formData.set("image", e.target.image.files[0]);
    // formData.append("user", data?.id);
    console.log(formData);
    try {
      await authApi.post("api/item/", formData);
      toast.success("Item created successfully");
    } catch (error) {
      toast.error("Item creation failed", { description: "Please try again" });
      form.setError("name", { message: "error" });
    }
  }

  if (categoriesLoading) return <FullScreenLoading />;

  return (
    <Dialog>
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
                    <Input placeholder="example@nu.edu.kz" {...field} />
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your image" type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Create item</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
