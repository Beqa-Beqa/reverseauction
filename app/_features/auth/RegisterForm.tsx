"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import DateInput from "@/components/custom/dateinput";

export default function RegisterForm() {
  const formSchema = z.object({
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters long!")
      .max(100, "First name must be up to 100 characters!"),
    lastName: z
      .string()
      .min(3, "First name must be at least 3 characters long!")
      .max(100, "First name must be up to 100 characters!"),

    dateOfBirth: z.object({
      day: z.number().min(1).max(31),
      month: z.number().min(1).max(12),
      year: z.number().min(1900).max(new Date().getFullYear())
    }),

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
      firstName: "",
      lastName: "",
      dateOfBirth: {},
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className="text-start mt-15 space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel required className="text-md">First Name</FormLabel>
              <FormControl>
                <Input
                  required
                  className="h-[52px]"
                  placeholder="e.g Vakho"
                  type="text"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel required className="text-md">Last Name</FormLabel>
              <FormControl>
                <Input
                  required
                  className="h-[52px]"
                  placeholder="e.g Maghradze"
                  type="text"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel required className="text-md">Date of Birth</FormLabel>
              <FormControl>
                <DateInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required className="text-md">Email Address</FormLabel>
              <FormControl>
                <Input
                  required
                  className="h-[52px]"
                  placeholder="Enter Your Email Address"
                  type="email"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel required className="text-md">Create Password</FormLabel>
              <FormControl>
                <Input
                  required
                  className="h-[52px]"
                  placeholder="Enter Your Password"
                  type="password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <span className="text-error block mb-2.5">Minimum 8 characters</span>
        <span className="text-error block mb-2.5">At least one number</span>
        <span className="text-error block mb-2.5">
          At least one capital letter
        </span>
        <span className="text-error block mb-2.5">At least one symbol</span>

        <Label className="mt-7">
          <Input
            name="terms-and-conditions"
            type="checkbox"
            className="w-[16px] h-[16px]"
          />
          <span className="w-full">
            I agree to the{" "}
            <Link
              href="/register"
              className="p-0 underline underline-offset-2 text-accent-secondary cursor-pointer"
            >
              terms &amp; conditions
            </Link>
          </span>
        </Label>
        <Button className="w-full mt-6 h-[50px]" type="submit">
          Sign Up
        </Button>
        <span>
          Already an account?{" "}
          <Link
            href="/login"
            className="p-0 underline underline-offset-2 text-accent-secondary cursor-pointer"
          >
            Sign In
          </Link>
        </span>
      </form>
    </Form>
  );
}
