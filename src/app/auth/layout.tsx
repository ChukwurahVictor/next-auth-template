"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import ProtectedPage from "@/utils/auth/ProtectedPage";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export type Children = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Children) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (session) {
        setAuthenticated(true);
        router.push("/dashboard");
      } else {
        setAuthenticated(false);
        router.push("/auth/login");
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (authenticated) {
    return null;
  }

  return (
    <Flex alignItems="center">
      {isLargerThan800 && (
        <Flex
          w={{ base: "60%", md: "45%", "2xl": "60%" }}
          align={"center"}
          bg={"color.lightBlue"}
          h={"100vh"}
          flexDir={"column"}
        >
          <Text color={"white"} fontWeight={600} fontSize={"24"} pt={"5rem"}>
            Account Login
          </Text>
        </Flex>
      )}
      <Flex
        justify={"center"}
        alignItems={"center"}
        mx={"auto"}
        h={"100vh"}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default AuthLayout;