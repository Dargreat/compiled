"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth"; // <-- Corrected import
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

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  // Validate input
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: ERROR_MESSAGES.INVALID_FIELDS };
  }

  const { email, password } = validatedFields.data;

  // Get user by email
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: ERROR_MESSAGES.EMAIL_NOT_EXIST };
  }

  // Check email verification
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: ERROR_MESSAGES.CONFIRMATION_EMAIL_SENT };
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return { error: ERROR_MESSAGES.INVALID_CREDENTIALS };
  }

  // Attempt sign-in
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirect
    });

    if (result?.error) {
      return { error: ERROR_MESSAGES.INVALID_CREDENTIALS };
    }

    // Redirect after successful login
    redirect(callbackUrl || "/");
  } catch (error) {
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG };
  }
};
