"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { z } from "zod";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const passwordRequirements = {
  min: z.string().min(8, "Be at least 8 characters long"),
  uppercase: z.string().regex(/[A-Z]/, "Contain at least one uppercase letter"),
  number: z.string().regex(/[0-9]/, "Contain at least one number"),
};

const baseSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().superRefine((password, ctx) => {
    if (password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message: "Be at least 8 characters long",
      });
    }

    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Contain at least one uppercase letter",
      });
    }

    if (!/[0-9]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Contain at least one number",
      });
    }
  }),
  confirmPassword: z.string(),
});

const signupSchema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export function SignupErrorScenario() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setIsFormVisible(true);
  }, []);

  const validateField = (name: keyof FormData, value: string) => {
    try {
      if (name === "confirmPassword") {
        if (formData.password !== value) {
          return { valid: false, errors: ["Passwords don't match"] };
        }
        return { valid: true, errors: [] };
      } else if (name === "password") {
        const errors: string[] = [];

        try {
          passwordRequirements.min.parse(value);
        } catch (e) {
          errors.push("Be at least 8 characters long");
        }

        try {
          passwordRequirements.uppercase.parse(value);
        } catch (e) {
          errors.push("Contain at least one uppercase letter");
        }

        try {
          passwordRequirements.number.parse(value);
        } catch (e) {
          errors.push("Contain at least one number");
        }

        return { valid: errors.length === 0, errors };
      } else if (name === "email") {
        try {
          baseSchema.shape.email.parse(value);
          return { valid: true, errors: [] };
        } catch (e) {
          if (e instanceof z.ZodError) {
            return {
              valid: false,
              errors: ["Please enter a valid email address"],
            };
          }
          return { valid: false, errors: ["An unknown error occurred"] };
        }
      } else {
        baseSchema.shape[name as keyof typeof baseSchema.shape].parse(value);
        return { valid: true, errors: [] };
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        return { valid: false, errors: fieldErrors[name as string] || [] };
      }
      return { valid: false, errors: ["An unknown error occurred"] };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const result = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: result.errors }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const result = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: result.errors }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors: FormErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const result = validateField(key as keyof FormData, value);
      if (!result.valid) {
        newErrors[key as keyof FormErrors] = result.errors;
        isValid = false;
      }
    });

    setErrors(newErrors);

    setTouched({ email: true, password: true, confirmPassword: true });

    if (isValid) {
      setErrors({
        email: ["This email is already registered. Try signing in instead."],
      });
    }
  };

  const getFieldStatus = (field: keyof FormData) => {
    if (!touched[field]) return "default";
    if (errors[field]?.length) return "error";
    if (formData[field]) return "success";
    return "default";
  };

  if (!isFormVisible) {
    return <div className="p-4 text-center">Loading form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      {submitted && Object.keys(errors).length === 0 && (
        <div className="p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 flex items-start gap-3 mb-6">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <p className="font-medium">Account created successfully!</p>
            <p className="text-sm text-green-700 dark:text-green-400">
              You can now sign in with your credentials.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "pr-10",
              getFieldStatus("email") === "error" &&
                "border-red-500 focus-visible:ring-red-500",
              getFieldStatus("email") === "success" &&
                "border-green-500 focus-visible:ring-green-500"
            )}
            placeholder="you@example.com"
          />
          {getFieldStatus("email") === "error" && (
            <AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />
          )}
          {getFieldStatus("email") === "success" && (
            <CheckCircle className="h-5 w-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
          )}
        </div>
        {errors.email && errors.email.length > 0 && touched.email && (
          <div className="text-sm text-red-500 mt-1 flex items-start gap-1.5">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{errors.email[0]}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "pr-10",
              getFieldStatus("password") === "error" &&
                "border-red-500 focus-visible:ring-red-500",
              getFieldStatus("password") === "success" &&
                "border-green-500 focus-visible:ring-green-500"
            )}
          />
          {getFieldStatus("password") === "error" && (
            <AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />
          )}
          {getFieldStatus("password") === "success" && (
            <CheckCircle className="h-5 w-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
          )}
        </div>
        {errors.password && errors.password.length > 0 && touched.password && (
          <div className="text-sm text-red-500 mt-1">
            <div className="flex items-start gap-1.5 mb-1">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Your password must:</span>
            </div>
            <ul className="list-disc pl-9 space-y-1">
              {errors.password.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {!errors.password && touched.password && formData.password && (
          <div className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4" />
            <span>Password meets requirements</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              "pr-10",
              getFieldStatus("confirmPassword") === "error" &&
                "border-red-500 focus-visible:ring-red-500",
              getFieldStatus("confirmPassword") === "success" &&
                "border-green-500 focus-visible:ring-green-500"
            )}
          />
          {getFieldStatus("confirmPassword") === "error" && (
            <AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />
          )}
          {getFieldStatus("confirmPassword") === "success" && (
            <CheckCircle className="h-5 w-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
          )}
        </div>
        {errors.confirmPassword &&
          errors.confirmPassword.length > 0 &&
          touched.confirmPassword && (
            <div className="text-sm text-red-500 mt-1 flex items-start gap-1.5">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{errors.confirmPassword[0]}</span>
            </div>
          )}
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </div>

      <div className="text-sm text-muted-foreground flex items-start gap-2 pt-2">
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <span>
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </span>
      </div>
    </form>
  );
}
