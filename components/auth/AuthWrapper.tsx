import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import ProtectedRoutes from "./protectedRoutes";

const authRoutes = ["/dashboard"];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoutes>{children}</ProtectedRoutes>
      ) : (
        children
      )}
    </>
  );
};

export default AuthWrapper;
