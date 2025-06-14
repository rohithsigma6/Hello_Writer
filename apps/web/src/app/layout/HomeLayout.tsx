import React from "react";
import LandingSiteNav from "@/app/components/LandingPage/LandingSiteNav";
import LandingFooter from "@/app/components/LandingPage/LandingFooter";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen  bg-landing-bg">
      <LandingSiteNav />
      {children}
      <LandingFooter />
    </main>
  );
};

export default HomeLayout;
