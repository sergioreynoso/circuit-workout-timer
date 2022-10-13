import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  //Extra safety
  if (status === "unauthenticated") return null;

  return <>{children}</>;
};

export default ProtectedRoute;
