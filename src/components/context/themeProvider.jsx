"use client";

import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

const ProviderTheme = ({ children }) => {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return <>{children}</>;
  // }

  return (
    <ThemeProvider
      enableSystem={true}
      attribute='class'>
      {children}
    </ThemeProvider>
  );
};

export default ProviderTheme;
