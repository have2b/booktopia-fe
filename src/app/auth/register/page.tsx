import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
    <div
      className={
        "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1"
      }
    >
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
