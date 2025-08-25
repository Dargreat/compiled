"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { redirect } from "next/navigation";

const ERROR_MESSAGES = {
  INVALID_FIELDS: "Invalid fields!",
  EMAIL_NOT_EXIST: "Email does not exist!",
  CONFIRMATION_EMAIL_SENT: "Confirmation email sent!",
  INVALID_CREDENTIALS: "Invalid credentials!",
  SOMETHING_WENT_WRONG: "Something went wrong!",
};

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: ERROR_MESSAGES.INVALID_FIELDS };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: ERROR_MESSAGES.EMAIL_NOT_EXIST };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: ERROR_MESSAGES.CONFIRMATION_EMAIL_SENT };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return { error: ERROR_MESSAGES.INVALID_CREDENTIALS };
  }

  try {
    const result = await signIn("credentials", { 
      email, 
      password,
      redirect: false, // Prevents automatic redirect
    });

    // The redirect will not be reached if the sign-in fails
    // or if the `signIn` call itself throws an error.
    if (result && !result.ok) {
      return { error: result?.error || ERROR_MESSAGES.SOMETHING_WENT_WRONG };
    }

  } catch (error) {
    // This catch block will only handle other unexpected errors.
    console.error("Login failed:", error);
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG };
  }
  
  // 🔑 Key Fix: The redirect should happen here, outside the try/catch.
  // This ensures the redirect error is not caught and is handled by Next.js.
  redirect(callbackUrl || "/");
};
