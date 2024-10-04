'use client';

import React from 'react'
import ProtectedPage from "@/utils/auth/ProtectedPage";
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{session?.user?.firstName}</p>
      <p>{session?.user?.lastName}</p>
      <p>{session?.user?.email}</p>
      <p>{session?.accessToken}</p>
    </div>
  )
}

export default ProtectedPage(Dashboard);