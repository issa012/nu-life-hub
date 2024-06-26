import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const loginFormSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email("This is not a valid email."),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    let { email, password } = values;

    try {
      await login(email, password);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      form.setError("email", { message: "Incorrect email or password" });
      form.setError("password", { message: "Incorrect email or password" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@nu.edu.kz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Link
            to="#"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full h-12 font-bold text-xl mt-10">
          Sign in
        </Button>
      </form>
    </Form>
  );
}
export default LoginForm;
