'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MapComponent from "../mappg/page";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(  "role" , session?.user?.role , "status" , status);
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session?.user?.role === "admin") {
    return <MapComponent />;
  }

  return null;
}