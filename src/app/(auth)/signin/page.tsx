import { AuthCard } from "@/components/auth/auth-card";
import { SignInForm } from "@/components/auth/signin-form";

function SignInPage() {
  return (
    <AuthCard
      title={"Sign In"}
      description={"Don't have an account yet?"}
      redirectHref={"/signup"}
      redirectText={"Sign Up"}
    >
      <SignInForm />
    </AuthCard>
  );
}

export default SignInPage;
