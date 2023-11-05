"use client";
// creating this component as a React Client Side Component

// import { Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
  // React.ReactNode represents an array of React Elements
}
/* 
ClientOnly is used to avoid the "Hydration" error caused when
there is some discrepancy while importing client and server side components

This is maybe caused by the NextJS 13 Experimental App Directory
*/

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  // check if the React Functional Components is mounted or not

  useEffect(() => {
    setHasMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // useEffect hook is used to mount the components

  if (!hasMounted) {
    // delays any click function until all react components are mounted
    return (
      <></>
      // <div className="flex items-center justify-center text-2xl font-semibold text-rose-500">
      // 	{/* <Loading type="points" size="xl" /> */}
      // 	Loading...
      // </div>
    );
  }

  return <>{children}</>;
};

export default ClientOnly;
