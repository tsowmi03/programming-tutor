import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthForm } from "@/components/AuthForm";
import { configuredOAuthProviders, oauthErrorMessage } from "@/lib/oauth";

export const dynamic = "force-dynamic";

export const metadata = { title: "Log in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  if (await getCurrentUser()) redirect("/");
  const { error, next } = await searchParams;
  return (
    <AuthForm
      mode="login"
      next={next}
      oauthError={oauthErrorMessage(error)}
      enabledOAuthProviders={configuredOAuthProviders()}
    />
  );
}
