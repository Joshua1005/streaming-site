import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/signup-form";

function SignUpPage() {
  return (
    <AuthCard
      title={"Sign Up"}
      description={"Already have an account?"}
      redirectHref={"/signin"}
      redirectText={"Sign In"}
    >
      <SignUpForm />
    </AuthCard>
  );
}

export default SignUpPage;
