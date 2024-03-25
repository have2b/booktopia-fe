import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div
      className={
        "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1"
      }
    >
      <LoginForm />
    </div>
  );
}
