"use client";

import { SessionProvider } from "next-auth/react";

export const AppProviderSession = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
