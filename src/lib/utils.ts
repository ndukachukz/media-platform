import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class PasswordFunctions {
  encrypt(password: string) {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  compare(password: string, hash: string) {
    return this.encrypt(password) === hash;
  }
}

export function generateOTP(length = 4) {
  // Define possible characters for the OTP
  const digits = "0123456789";
  let otp = "";

  // Loop to generate the OTP
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
}
