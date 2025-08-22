"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import DateInput from "@/components/custom/dateinput";
import { X, Check } from "lucide-react";
import { passHas8Chars, passHasCapital, passHasNumber, passHasSymbol } from "@/lib/password-validation";


export default function RegisterForm() {
  const formSchema = z.object({
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters long!")
      .max(100, "First name must be up to 100 characters!"),
    lastName: z
      .string()
      .min(3, "Last name must be at least 3 characters long!")
      .max(150, "Last name must be up to 150 characters!"),

    dateOfBirth: z.object({
      day: z.number().min(1).max(31),
      month: z.number().min(1).max(12),
      year: z.number().min(1900).max(new Date().getFullYear()),
    }, "Please enter valid date of birth!"),

    email: z
      .email("Please enter valid email address!")
      .min(1, "Email field is required!")
      .max(250, "Email length must be up to 250 characters!"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long!")
      .max(250, "Password must be up to 250 characters!")
      .refine(
        (value) =>
          passHas8Chars(value) &&
          passHasCapital(value) &&
          passHasNumber(value) &&
          passHasSymbol(value),
        "Please enter valid password!"
      ),
    agreement: z.boolean().refine((value) => value === true, "Please agree to the terms and conditions!"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: {},
      email: "",
      password: "",
      agreement: false,
    },
  });

  const password = form.watch("password");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Handle submit ...
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
              <FormLabel required className="text-md">
                First Name
              </FormLabel>
              <FormControl>
                <Input
                  required
                  className="h-[52px]"
                  placeholder="e.g Vakho"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel required className="text-md">
                Last Name
              </FormLabel>
              <FormControl>
                <Input
                  required
                  className="h-[52px]"
                  placeholder="e.g Maghradze"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel required className="text-md">
                Date of Birth
              </FormLabel>
              <FormControl>
                <DateInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required className="text-md">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  required
                  className="h-[52px]"
                  placeholder="Enter Your Email Address"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel required className="text-md">
                Create Password
              </FormLabel>
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

        <span
          className={`${
            !passHas8Chars(password) ? "text-error" : "text-success"
          } mb-2.5 flex items-center`}
        >
          {!passHas8Chars(password) ? (
            <X className="inline mr-2 h-4 w-4" aria-hidden />
          ) : (
            <Check className="inline mr-2 h-4 w-4" aria-hidden />
          )}
          Minimum 8 characters
        </span>
        <span
          className={`${
            !passHasNumber(password) ? "text-error" : "text-success"
          } mb-2.5 flex items-center`}
        >
          {!passHasNumber(password) ? (
            <X className="inline mr-2 h-4 w-4" aria-hidden />
          ) : (
            <Check className="inline mr-2 h-4 w-4" aria-hidden />
          )}
          At least one number
        </span>
        <span
          className={`${
            !passHasCapital(password) ? "text-error" : "text-success"
          } mb-2.5 flex items-center`}
        >
          {!passHasCapital(password) ? (
            <X className="inline mr-2 h-4 w-4" aria-hidden />
          ) : (
            <Check className="inline mr-2 h-4 w-4" aria-hidden />
          )}
          At least one capital letter
        </span>
        <span
          className={`${
            !passHasSymbol(password) ? "text-error" : "text-success"
          } block mb-2.5`}
        >
          {!passHasSymbol(password) ? (
            <X className="inline mr-2 h-4 w-4" aria-hidden />
          ) : (
            <Check className="inline mr-2 h-4 w-4" aria-hidden />
          )}
          At least one symbol
        </span>

        <FormField
          control={form.control}
          name="agreement"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Label className="mt-7">
                  <Input
                    type="checkbox"
                    className="w-[16px] h-[16px]"
                    checked={field.value}
                    onChange={field.onChange}
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
