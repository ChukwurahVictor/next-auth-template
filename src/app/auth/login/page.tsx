"use client";

import React, { useEffect, useState } from 'react'
import ProtectedPage from "@/utils/auth/ProtectedPage";
import Link from "next/link";
import { Box, Flex, Text } from "@chakra-ui/react";
import AppInput from "@/components/app-input";
import AppButton from '@/components/app-button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from '@/schema';
import toast from 'react-hot-toast';

interface ILogin {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const formHook = useForm<ILogin>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  } as { resolver: Resolver<any> });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook;

  const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    });

    setLoading(false);

    if (res?.error) {
      toast.error(res.error || "Error logging in");
    } else {
      toast.success("Login Successful!");
      router.push("/dashboard");
    }
  };


  return (
    <Flex flexDir={"column"} w={"100%"} mx={"auto"}>
      <Flex justify="center" mb="3rem">
        <Flex
          justify="center"
          my="1rem"
          flexDir={"column"}
          alignItems={"center"}
        >
          <Text fontWeight={600} fontSize={"24px"}>
            Log in to your Account
          </Text>
          <Text fontWeight={400} fontSize={"16px"} mt={"1rem"}>
            Enter your login details
          </Text>
        </Flex>
      </Flex>
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width={{ xs: "80%", sm: "80%", md: "70%" }}
        m="auto"
      >
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
              width={{ base: "30rem", sm: "40rem", md: "25rem" }}
              gap="2rem"
              justifyContent={"center"}
              direction={"column"}
            >
              <AppInput
                id="email"
                type="email"
                label="Email"
                placeholder="johndoe@email.com"
                register={register("email")}
                errorMessage={errors.email?.message}
              />
              <AppInput
                id="password"
                type="password"
                label="Password"
                placeholder="********"
                register={register("password")}
                errorMessage={errors.password?.message}
              />
            </Flex>
            <Flex justify={"end"} mt={"2rem"}>
              <Link href="/auth/request-reset-password">
                <Text variant="label" color="typography.wine" cursor="pointer">
                  Forgot Password?
                </Text>
              </Link>
            </Flex>
            <AppButton
              isLoading={loading}
              type="submit"
              variant="primary"
              mt="3rem"
              width="full"
              backgroundColor={"color.lightBlue"}
            >
              Login
            </AppButton>
          </form>
          <Flex justify={"center"} alignItems={"center"} mt={"1rem"}>
            <Text mr={".3rem"}>Don’t have an account? </Text>

            <Link href="/auth/signup">
              <Text variant="label" color="brand.primary" cursor="pointer">
                Sign Up
              </Text>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ProtectedPage(LoginPage);