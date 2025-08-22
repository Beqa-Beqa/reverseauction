"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
  const formSchema = z.object({
    email: z
      .email()
      .min(1, "Email field is required!")
      .max(250, "Email length must be up to 250 characters!"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long!")
      .max(250, "Password must be up to 250 characters!")
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value ?? ""
          ),
        "Please enter valid password!"
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form className="text-start mt-15 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Email Address</FormLabel>
              <FormControl>
                <Input className="h-[52px]" placeholder="Enter Your Email Address" type="email" { ...field } />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel className="text-md">Password</FormLabel>
              <FormControl>
                <Input className="h-[52px]" placeholder="Enter Your Password" type="password" { ...field } />
              </FormControl>
            </FormItem>
          )}
        />
        {/* <span className="text-error">Incorrect password, please try again!</span> */}

        <Button type="button" variant="ghost" className="p-0 mt-2 mb-0 underline underline-offset-2 text-text-placeholder border-text-placeholder w-fit cursor-pointer rounded-none">Forgot Password?</Button>
        <Button className="w-full mt-6 h-[50px]" type="submit">Sign in</Button>
        <span>Don’t have an account? <Link href="/register" className="p-0 underline underline-offset-2 text-accent-secondary cursor-pointer">Create one</Link></span>
      </form>
    </Form>
  );
}
