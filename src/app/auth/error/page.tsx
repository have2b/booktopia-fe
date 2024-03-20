import { ErrorCard } from "@/components/auth/error-card";

const AuthErrorPage = () => {
  return (
    <div
      className={
        "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1"
      }
    >
      <ErrorCard />
    </div>
  );
};

export default AuthErrorPage;
