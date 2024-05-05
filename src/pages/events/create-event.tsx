import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { fetchAllClubs } from "../clubs/club-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent, fetchEventCategories } from "./event-service";

import FullScreenLoading from "@/components/fullscreen-loading";
import CategorySelect from "@/components/select-category";
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
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/lib/constants";

const eventFormSchema = z.object({
  user: z.number(),
  club: z.string(),
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  image_url: z
    .any()
    .refine((file) => {
      return file?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  date: z.string(),
  location: z.string().min(1),
});

export type IEventForm = z.infer<typeof eventFormSchema>;

export function CreateEvent() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success("Item created successfully");
      setOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["event"] });
    },
    onError: () => {
      form.setError("root.serverError", { message: "Server error occured" });
    },
  });

  const { data: clubs, isLoading: clubsLoading } = useQuery({
    queryKey: ["club-list"],
    queryFn: () => fetchAllClubs(),
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["event-categories"],
    queryFn: () => fetchEventCategories(),
  });

  const form = useForm<IEventForm>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      user: user!.id,
      club: "",
      name: "",
      description: "",
      category: "",
      image_url: null,
      date: "",
      location: "",
    },
  });

  async function onSubmit(values: IEventForm) {
    await mutateAsync(values);
  }

  if (clubsLoading || categoriesLoading) return <FullScreenLoading />;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create event</DialogTitle>
          <DialogDescription>Enter all information below to create an event</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name of your event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="club"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Club</FormLabel>
                    <FormControl>
                      <CategorySelect
                        categories={clubs.results}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
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
                        defaultValue={"" + field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
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
              <Button type="submit">Create event</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
