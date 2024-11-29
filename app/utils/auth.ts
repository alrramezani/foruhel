import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
export async function authenticateUser(username: string, password: string) {
  const storedUsername = process.env.NEXT_PUBLIC_USERNAME || "";
  const storedPasswordHash = process.env.NEXT_PUBLIC_PASSWORD_HASH || "";
  if (username !== storedUsername) return false;
  return await bcrypt.compare(password, storedPasswordHash);
}
export class AuthError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = "Authentication";
  }
}
export const checkAuth = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.has("auth");
    const isAuth = cookieStore.has("auth");
    if (!isAuth) {
      throw new AuthError(
        "Authentication required. Please log in to access this resource.",
        401
      );
    }
    return true;
  } catch {
    throw new AuthError(
      "Authentication required. Please log in to access this resource.",
      401
    );
  }
};
