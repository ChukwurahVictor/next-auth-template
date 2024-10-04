"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSession } from "next-auth/react";
import { isAuthenticated } from "./isAuthenticated";

export default function withAuth(WrappedComponent: React.ComponentType) {
  const ComponentWithAuth = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const checkAuth = async () => {
        const authenticated = await isAuthenticated();
        setAuthenticated(authenticated);
        setLoading(false);

        if (!authenticated && !pathname.startsWith("/auth")) {
          router.push("/auth/login");
        } else if (authenticated && pathname.startsWith("/auth")) {
          router.push("/dashboard");
        }

      };

      checkAuth();
    }, [pathname, router]);

    if (loading) {
      return <h1>Loading...</h1>;
    }

    if (authenticated && pathname.startsWith("/auth")) {
      return null;
    }

    if (!authenticated && !pathname.startsWith("/auth")) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
}
