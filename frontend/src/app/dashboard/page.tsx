"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /dashboard/overview
    router.push("/dashboard/overview");
  }, [router]);

  return <></>;
};

export default Page;
