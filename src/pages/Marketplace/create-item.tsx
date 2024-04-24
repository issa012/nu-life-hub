import { authApi } from "@/authApi";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import useUser from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

export function CreateItem() {
  const itemFormSchema = z.object({
    name: z.string().min(1, { message: "Necessary" }),
    user: z.number(),
    description: z.string().min(1, { message: "Necessary" }),
    price: z.string().min(1, { message: "Necessary" }),
    category: z.string().min(1, { message: "Necessary" }),
    image: z.any(),
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
      const res = await authApi.post("api/item/", formData);
    } catch (error) {
      form.setError("name", { message: "error" });
    }
  }

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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="1">Other</SelectItem>
                            <SelectItem value="2">Banana</SelectItem>
                            <SelectItem value="3">Blueberry</SelectItem>
                            <SelectItem value="4">Grapes</SelectItem>
                            <SelectItem value="5">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
              <Button type="submit">Create item</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
