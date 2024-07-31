import { AuthCard } from "@/components/auth/auth-card";
import { AuthSkeleton } from "@/components/auth/auth-skeleton";
import { SignUpForm } from "@/components/auth/signup-form";

function SignUpPage() {
  return (
    <AuthSkeleton />
    // <AuthCard
    //   title={"Sign Up"}
    //   description={"Already have an account?"}
    //   redirectHref={"/signin"}
    //   redirectText={"Sign In"}
    // >
    //   <SignUpForm />
    // </AuthCard>
  );
}

export default SignUpPage;
