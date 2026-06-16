import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthForm } from "@/components/AuthForm";
import { oauthErrorMessage } from "@/lib/oauth";

export const dynamic = "force-dynamic";

export const metadata = { title: "Sign up" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  if (await getCurrentUser()) redirect("/");
  const { error, next } = await searchParams;
  return (
    <AuthForm mode="signup" next={next} oauthError={oauthErrorMessage(error)} />
  );
}
