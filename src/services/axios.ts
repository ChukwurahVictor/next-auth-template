"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const useAxios = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      config => {
        if (status === "authenticated" && session?.accessToken) {
          config.headers["Authorization"] = `Bearer ${session.accessToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [session, status]);

  return axios;
};

export default useAxios;
