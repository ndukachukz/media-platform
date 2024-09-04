export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_REGEX = /^(\+\d{1,3}[-\s]?)?\d{10,14}$/;
export const EMAIL_PHONE_REGEX =
  /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(\+\d{1,3}[- ]?)?\d{10,14})$/;

export const tokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiry
